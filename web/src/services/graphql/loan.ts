import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { gql } from "@apollo/client";
import { GetLoansQuery, LoanFilter } from "@/__generated__/graphql";

export const GET_LOANS: TypedDocumentNode<GetLoansQuery, { filters?: LoanFilter }> = gql`
  query GetLoans($filters: LoanFilter) {
    loans(filters: $filters) {
      id
      name
      principal
      dueDate
      interestRate
      payments {
        id
        paymentDate
        amount
      }
    }
  }
`;
