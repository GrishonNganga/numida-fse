/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: { input: any; output: any; }
};

export type ExistingLoan = {
  __typename?: 'ExistingLoan';
  /** Due date of the loan */
  dueDate: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The interest rate of the loan */
  interestRate: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  payments?: Maybe<Array<Maybe<LoanPayment>>>;
  /** The loan amount given as principal */
  principal: Scalars['Int']['output'];
};

export type LoanFilter = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type LoanPayment = {
  __typename?: 'LoanPayment';
  /** The amount of the payment */
  amount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  /** The ID of the loan referenced */
  loanId: Scalars['ID']['output'];
  /** The date of the payment */
  paymentDate: Scalars['Date']['output'];
};

export type LoanQueries = {
  __typename?: 'LoanQueries';
  loanPayments?: Maybe<Array<Maybe<LoanPayment>>>;
  loans?: Maybe<Array<Maybe<ExistingLoan>>>;
};


export type LoanQueriesLoansArgs = {
  filters?: InputMaybe<LoanFilter>;
};

export type GetLoansQueryVariables = Exact<{
  filters?: InputMaybe<LoanFilter>;
}>;


export type GetLoansQuery = { __typename?: 'LoanQueries', loans?: Array<{ __typename?: 'ExistingLoan', id: string, name: string, principal: number, dueDate: any, interestRate: number, payments?: Array<{ __typename?: 'LoanPayment', id: string, paymentDate: any, amount?: number | null } | null> | null } | null> | null };


export const GetLoansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLoans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LoanFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"principal"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"interestRate"}},{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paymentDate"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<GetLoansQuery, GetLoansQueryVariables>;