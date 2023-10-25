import React from 'react';
import styled from '@emotion/styled';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DataTable, DataTableCell, DataTableRow } from './components/DataTable';
import { generateSchedule, ScheduleData } from './calculation';
import { PageStyleWrapper } from './StyleWrapper';
import { useAppContext } from './AppContext';

type FormValues = {
  /** Loan amount */
  principle: number;

  /** Loan term in years */
  loanTerm: number;

  /** Interest rate (percentage) */
  interestRate: number;
};

const Home = () => {
  const { isCalculationRounded } = useAppContext();
  const { register, handleSubmit } = useForm<FormValues>();

  const [formValues, setFormValues] = React.useState<FormValues>({
    principle: 0,
    loanTerm: 0,
    interestRate: 0,
  });

  const scheduleData: ScheduleData[] = React.useMemo(() => {
    const totalPayments = formValues.loanTerm * 12;
    const interestRateInDecimal = formValues.interestRate / 100;

    return generateSchedule({
      totalPayments,
      interestRate: interestRateInDecimal,
      principle: formValues.principle,
      isCalculationRounded,
    });
  }, [formValues.interestRate, formValues.loanTerm, formValues.principle, isCalculationRounded]);

  const onHandleSubmit: SubmitHandler<FormValues> = (formData) => {
    setFormValues(formData);
  };

  const columnLabels: DataTableCell[] = [
    {
      value: `Month`,
      key: `month`,
    },
    {
      value: `Interest Payment`,
      key: `interestPayment`,
    },
    {
      value: `Principle Payment`,
      key: `principlePayment`,
    },
    {
      value: `Monthly Payment`,
      key: `monthlyPayment`,
    },
    {
      value: `Ending Principle`,
      key: `principle`,
    },
  ];

  const rows = scheduleData.map((data: ScheduleData, index): DataTableRow => {
    const locale = `en-US`;
    const options = { style: `currency`, currency: `USD` };

    return {
      id: crypto.randomUUID(),
      data: [
        {
          value: index + 1,
          key: `month`,
        },
        {
          value: data.interestPayment.toLocaleString(locale, options),
          key: `interestPayment`,
        },
        {
          value: data.principlePayment.toLocaleString(locale, options),
          key: `principlePayment`,
        },
        {
          value: data.monthlyPayment.toLocaleString(locale, options),
          key: `monthlyPayment`,
        },
        {
          value: data.principle.toLocaleString(locale, options),
          key: `principle`,
        },
      ],
    };
  });

  return (
    <PageStyleWrapper>
      <Title>Loan Amortization Schedule Calculator</Title>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <TextField
          required={true}
          type="number"
          label="Loan amount"
          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
          {...register(`principle`)}
        />
        <TextField
          required={true}
          type="number"
          label="Loan term"
          InputProps={{ endAdornment: <InputAdornment position="end">years</InputAdornment> }}
          {...register(`loanTerm`)}
        />
        <TextField
          required={true}
          type="number"
          label="Interest rate"
          inputProps={{ step: 0.001 }}
          InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
          {...register(`interestRate`)}
        />
        <Button sx={{ p: 2 }} type="submit" variant="contained">
          Calculate Payments
        </Button>
      </form>
      {!!scheduleData.length && (
        <Box py={1}>
          <DataTable columnLabels={columnLabels} rows={rows} />
        </Box>
      )}
    </PageStyleWrapper>
  );
};

const Title = styled.h1({ fontSize: 28 });

export { Home };
