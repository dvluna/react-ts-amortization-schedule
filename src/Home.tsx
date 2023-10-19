import React from 'react';
import styled from '@emotion/styled';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Row, Table } from './components/Table';
import { generateSchedule, ScheduleData } from './calculation';
import { PageStyleWrapper } from './StyleWrapper';

type FormValues = {
  principle: number;
  loanTerm: number;
  interestRate: number;
};

const Home = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const [scheduleData, setScheduleData] = React.useState<ScheduleData[]>([]);

  const onHandleSubmit = ({ principle, loanTerm, interestRate }: FormValues) => {
    const totalPayments = loanTerm * 12;
    const interestRateInDecimal = interestRate / 100;

    const scheduleData = generateSchedule({
      totalPayments,
      interestRate: interestRateInDecimal,
      principle
    });

    setScheduleData(scheduleData);
  };

  const columnLabels = [
    `Month`,
    `Interest Payment`,
    `Principle Payment`,
    `Monthly Payment`,
    `Ending Principle`
  ];

  const rows = scheduleData.map((data: ScheduleData, index): Row => {
    const locale = `en-US`;
    const options = { style: `currency`, currency: `USD` };

    return {
      id: crypto.randomUUID(),
      data: [
        index + 1,
        data.interestPayment.toLocaleString(locale, options),
        data.principlePayment.toLocaleString(locale, options),
        data.monthlyPayment.toLocaleString(locale, options),
        data.principle.toLocaleString(locale, options),
      ]
    };
  });

  return (
    <PageStyleWrapper>
      <Title>Loan Amortization Schedule Calculator</Title>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <TextField
          required
          type="number"
          label="Loan amount"
          InputProps={{ startAdornment: (<InputAdornment position="start">$</InputAdornment>) }}
          {...register(`principle`)}
        />
        <TextField
          required
          type="number"
          label="Loan term"
          InputProps={{ endAdornment: (<InputAdornment position="end">years</InputAdornment>) }}
          {...register(`loanTerm`)}
        />
        <TextField
          required
          type="number"
          label="Interest rate"
          inputProps={{ step: 0.001 }}
          InputProps={{ endAdornment: (<InputAdornment position="end">%</InputAdornment>) }}
          {...register(`interestRate`)}
        />
        <Button sx={{ p: 2 }} type="submit" variant="contained">Calculate Payments</Button>
      </form>
      {!!scheduleData.length &&
        <Box py={1}>
          <Table columnLabels={columnLabels} rows={rows} />
        </Box>
      }
    </PageStyleWrapper>
  );
}

const Title = styled.h1({ fontSize: 28 });

export { Home };
