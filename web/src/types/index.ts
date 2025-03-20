import { ExistingLoan } from "@/__generated__/graphql";

export type Loan = ExistingLoan & {
  status: string;
  daysOverdue: number;
  totalPaid: number;
};
