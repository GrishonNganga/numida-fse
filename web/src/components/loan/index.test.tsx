import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import Loans from "./index";
import { useLoans } from "@/hooks/use-loans";
import { ExistingLoan } from "@/__generated__/graphql";

expect.extend(matchers);

type MockLoan = {
  id: string;
  name: string;
  principal: number;
  dueDate: string;
  payments: Array<{
    paymentDate: string;
    amount: number;
  }>;
  interestRate: number;
};

vi.mock('@/hooks/use-loans', () => ({
  useLoans: vi.fn()
}));

vi.mock('./title', () => ({
  default: () => <div data-testid="title">Loans Title</div>
}));

vi.mock("./loan-list", () => ({
  default: ({
    refetch,
    isLoading,
    loans,
  }: {
    loans: ExistingLoan[];
    refetch: () => void;
    isLoading: boolean;
  }) => (
    <div data-testid="loan-list">
      <div data-testid="loading-state">{isLoading ? 'Loading...' : 'Loaded'}</div>
      <div data-testid="loans-container">
        {loans.map(loan => (
          <div key={loan.id} data-testid="loan-card">{loan.name}</div>
        ))}
      </div>
      <button data-testid="refetch-button" onClick={refetch}>Refetch</button>
    </div>
  )
}));

describe('Loans Component', () => {
  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with loading state", () => {
    (useLoans as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      loans: [],
      loading: true,
      refetch: mockRefetch,
    });

    render(<Loans />);

    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('loan-list')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it("renders with empty loans list", () => {
    (useLoans as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      loans: [],
      loading: false,
      refetch: mockRefetch,
    });

    render(<Loans />);

    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('loan-list')).toBeInTheDocument();
    expect(screen.getByText('Loaded')).toBeInTheDocument();
    expect(screen.queryAllByTestId('loan-card')).toHaveLength(0);
  });

  it('renders with loans data', () => {
    const mockLoans: MockLoan[] = [
      { 
        id: '1', 
        name: 'Loan 1',
        principal: 1000,
        dueDate: '2024-12-31',
        payments: [],
        interestRate: 5
      },
      { 
        id: '2', 
        name: 'Loan 2',
        principal: 2000,
        dueDate: '2024-12-31',
        payments: [],
        interestRate: 5
      }
    ];

    (useLoans as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      loans: mockLoans as unknown as ExistingLoan[],
      loading: false,
      refetch: mockRefetch,
    });

    render(<Loans />);

    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('loan-list')).toBeInTheDocument();
    expect(screen.getByText('Loaded')).toBeInTheDocument();
    const loanCards = screen.queryAllByTestId('loan-card');
    expect(loanCards).toHaveLength(2);
    expect(loanCards[0]).toHaveTextContent('Loan 1');
    expect(loanCards[1]).toHaveTextContent('Loan 2');
  });

  it("passes refetch function to LoanList", () => {
    (useLoans as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      loans: [],
      loading: false,
      refetch: mockRefetch,
    });

    render(<Loans />);

    const refetchButton = screen.getByTestId('refetch-button');
    refetchButton.click();
    expect(mockRefetch).toHaveBeenCalled();
  });
}); 