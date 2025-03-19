import { gql } from "@/__generated__/gql";

export const GET_LOANS = gql(`
  query GetLoans($filters: LoanFilter) {
    loans(filters: $filters) {
      id
      name
      principal
      dueDate
      payments {
        id
        paymentDate
        amount
      }
    }
  }
`);
