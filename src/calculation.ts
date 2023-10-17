type CalcMonthlyArgs = {
  principle: number;           /* P */
  monthlyInterestRate: number; /* r */
  totalPayments: number;       /* n */
};

type GenScheduleArgs = {
  principle: number;
  interestRate: number;
  totalPayments: number;
};

export type ScheduleData = {
  monthlyPayment: number;
  interestPayment: number;
  principlePayment: number;
  principle: number;
};

/**
 * M = P * ( (r*(1+r)^n) / ((1 + r)^n - 1) )
 */
const calculateMonthlyPayment = ({ principle, monthlyInterestRate: r, totalPayments: n }: CalcMonthlyArgs) => {
  const payment = principle * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);

  return roundToCent(payment);
};

const generateSchedule = ({ principle, interestRate, totalPayments }: GenScheduleArgs) => {
  const schedule: ScheduleData[] = [];

  const monthlyInterestRate = interestRate / 12;
  const monthlyPayment = calculateMonthlyPayment({ principle, monthlyInterestRate, totalPayments });

  for (let i = 0, currentPrinciple = principle; i < totalPayments; i++) {
    const interestPayment = roundToCent(currentPrinciple * monthlyInterestRate);
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
}

/**
 * Since we are dealing with currency let's keep calculations down to the nearest cent.
 * This may not line up with other schedule calculations, but I believe these number represent
 * real world numbers better.
 */
const roundToCent = (num: number) => {
  // return num;
  return Math.round(num * 100) / 100;
}

export { calculateMonthlyPayment, generateSchedule };
