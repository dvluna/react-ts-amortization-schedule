type CalcMonthlyArgs = {
  /** Principle */
  principle: number /* P */;

  /** Monthly interest rate */
  monthlyInterestRate: number /* r */;

  /** Total number of payments */
  totalPayments: number /* n */;
};

type GenScheduleArgs = {
  /** Principle */
  principle: number;

  /** Yearly interest rate */
  interestRate: number;

  /** Total number of payments */
  totalPayments: number;

  /** Calculations rounded to nearest cent */
  isCalculationRounded?: boolean;
};

export type ScheduleData = {
  /** Monthly payment amount */
  monthlyPayment: number;

  /** Interest payment */
  interestPayment: number;

  /** Principle payment */
  principlePayment: number;

  /** Principle */
  principle: number;
};

/**
 * M = P * ( (r*(1+r)^n) / ((1 + r)^n - 1) )
 */
const calculateMonthlyPayment = ({
  principle,
  monthlyInterestRate: r,
  totalPayments: n,
}: CalcMonthlyArgs) => {
  return (principle * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
};

const generateSchedule = ({
  principle,
  interestRate,
  totalPayments,
  isCalculationRounded = true,
}: GenScheduleArgs) => {
  const schedule: ScheduleData[] = [];

  const monthlyInterestRate = interestRate / 12;
  const monthlyPayment = updatePrecision(
    calculateMonthlyPayment({ principle, monthlyInterestRate, totalPayments }),
    isCalculationRounded,
  );

  for (let i = 0, currentPrinciple = principle; i < totalPayments; i++) {
    const interestPayment = updatePrecision(
      currentPrinciple * monthlyInterestRate,
      isCalculationRounded,
    );

    const principlePayment = monthlyPayment - interestPayment;

    currentPrinciple = monthlyPayment < currentPrinciple ? currentPrinciple - principlePayment : 0;
    schedule.push({
      monthlyPayment,
      interestPayment,
      principlePayment,
      principle: currentPrinciple,
    });
  }

  return schedule;
};

const updatePrecision = (value: number, isCalculationRounded: boolean) => {
  return isCalculationRounded ? roundToCent(value) : value;
};

/**
 * Round calculations down to the nearest cent.
 */
const roundToCent = (num: number) => {
  return Math.round(num * 100) / 100;
};

export { calculateMonthlyPayment, generateSchedule };
