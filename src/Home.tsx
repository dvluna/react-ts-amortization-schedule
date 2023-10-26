import React from 'react';
import styled from '@emotion/styled';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DataTable, DataTableCell, DataTableRow } from './components/DataTable';
import { generateSchedule, ScheduleData } from './calculation';
import { useAppContext } from './AppContext';
import { PageStyleWrapper } from './StyleWrapper';

const LOCALE = `en-US` as const;
const LOCALE_CURRENCY_OPTIONS = { style: `currency`, currency: `USD` } as const;

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
  const { handleSubmit, register, setFocus } = useForm<FormValues>();

  const [formValues, setFormValues] = React.useState<FormValues>({
    principle: 0,
    loanTerm: 0,
    interestRate: 0,
  });

  /** Focus loan amount (principle) field on mount */
  React.useEffect(() => {
    setFocus(`principle`);
  }, [setFocus]);

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

  const scheduleData = React.useMemo(() => {
    return generateSchedule({
      totalPayments: formValues.loanTerm * 12,
      interestRate: formValues.interestRate / 100,
      principle: formValues.principle,
      isCalculationRounded,
    });
  }, [formValues.interestRate, formValues.loanTerm, formValues.principle, isCalculationRounded]);

  const rows = React.useMemo(() => {
    return scheduleData.map(
      (data: ScheduleData, index): DataTableRow => ({
        id: crypto.randomUUID(),
        data: [
          {
            value: index + 1,
            key: `month`,
          },
          {
            value: data.interestPayment.toLocaleString(LOCALE, LOCALE_CURRENCY_OPTIONS),
            key: `interestPayment`,
          },
          {
            value: data.principlePayment.toLocaleString(LOCALE, LOCALE_CURRENCY_OPTIONS),
            key: `principlePayment`,
          },
          {
            value: data.monthlyPayment.toLocaleString(LOCALE, LOCALE_CURRENCY_OPTIONS),
            key: `monthlyPayment`,
          },
          {
            value: data.principle.toLocaleString(LOCALE, LOCALE_CURRENCY_OPTIONS),
            key: `principle`,
          },
        ],
      }),
    );
  }, [scheduleData]);

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
      {!!rows.length && (
        <Box py={1}>
          <DataTable columnLabels={columnLabels} rows={rows} />
        </Box>
      )}
    </PageStyleWrapper>
  );
};

const Title = styled.h1({ fontSize: 28 });

export { Home };
