import React from 'react';
import styled from '@emotion/styled';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { Table } from './components/Table';
import { generateSchedule, ScheduleData } from './calculation';
import { PageStyleWrapper } from './StyleWrapper';

const Home = () => {
  const { register, handleSubmit } = useForm();

  const [scheduleData, setScheduleData] = React.useState<ScheduleData[]>([]);

  const onHandleSubmit = ({ principle, loanTerm, interestRate }: FieldValues) => {
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

  const rows = scheduleData.map((data: ScheduleData, index): React.ReactNode[] => {
    return [
      index + 1,
      data.interestPayment.toLocaleString(`en-US`, { style: `currency`, currency: `USD` }),
      data.principlePayment.toLocaleString(`en-US`, { style: `currency`, currency: `USD` }),
      data.monthlyPayment.toLocaleString(`en-US`, { style: `currency`, currency: `USD` }),
      data.principle.toLocaleString(`en-US`, { style: `currency`, currency: `USD` }),
    ];
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
