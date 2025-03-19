import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoanCard from "./loan-card";
import { formatCurrency } from "@/lib/utils";

vi.mock("@/components/ui/badge", () => ({
  Badge: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="badge" className={className}>
      {children}
    </div>
  ),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button data-testid="add-transaction-button" onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock("./repayment-card", () => ({
  default: ({
    id,
    amount,
    paymentDate,
  }: {
    id: number;
    amount: number;
    paymentDate: string;
  }) => (
    <div data-testid={`repayment-card-${id}`}>
      <div data-testid={`repayment-amount-${id}`}>{formatCurrency(amount)}</div>
      <div data-testid={`repayment-date-${id}`}>{paymentDate}</div>
    </div>
  ),
}));

describe("LoanCard Component", () => {
  const mockLoan = {
    id: "1",
    name: "Test Loan",
    principal: 10000,
    status: "On time",
    daysOverdue: 0,
    dueDate: "2024-12-31",
    interestRate: 5,
    payments: [
      {
        id: "1",
        amount: 1000,
        paymentDate: "2024-03-19",
        loanId: "1"
      },
    ],
  };

  const mockSetSelectedLoan = vi.fn();
  const mockSetAddTransactionModalOpen = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loan card with basic information", () => {
    render(
      <LoanCard
        loan={mockLoan}
        setSelectedLoan={mockSetSelectedLoan}
        isSelected={false}
        setAddTransactionModalOpen={mockSetAddTransactionModalOpen}
      />
    );

    expect(screen.getByText(mockLoan.name)).toBeInTheDocument();
    expect(screen.getByText("KES 10,000")).toBeInTheDocument();
    expect(screen.getByText(mockLoan.status)).toBeInTheDocument();
  });

  it("shows overdue days when applicable", () => {
    const overdueLoan = {
      ...mockLoan,
      daysOverdue: 5,
    };

    render(
      <LoanCard
        loan={overdueLoan}
        setSelectedLoan={mockSetSelectedLoan}
        isSelected={false}
        setAddTransactionModalOpen={mockSetAddTransactionModalOpen}
      />
    );

    expect(screen.getByText("Overdue 5 days")).toBeInTheDocument();
  });

  it("toggles selection when clicked", () => {
    render(
      <LoanCard
        loan={mockLoan}
        setSelectedLoan={mockSetSelectedLoan}
        isSelected={false}
        setAddTransactionModalOpen={mockSetAddTransactionModalOpen}
      />
    );

    fireEvent.click(screen.getByText(mockLoan.name));
    expect(mockSetSelectedLoan).toHaveBeenCalledWith(mockLoan);

    cleanup();

    render(
      <LoanCard
        loan={mockLoan}
        setSelectedLoan={mockSetSelectedLoan}
        isSelected={true}
        setAddTransactionModalOpen={mockSetAddTransactionModalOpen}
      />
    );

    fireEvent.click(screen.getByText(mockLoan.name));
    expect(mockSetSelectedLoan).toHaveBeenCalledWith(null);
  });

  it("shows loan details when selected", () => {
    render(
      <LoanCard
        loan={mockLoan}
        setSelectedLoan={mockSetSelectedLoan}
        isSelected={true}
        setAddTransactionModalOpen={mockSetAddTransactionModalOpen}
      />
    );

    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Add Transaction")).toBeInTheDocument();
    expect(
      screen.getByTestId(`repayment-card-${mockLoan.payments[0].id}`)
    ).toBeInTheDocument();
  });

  it("opens add transaction modal when button is clicked", () => {
    render(
      <LoanCard
        loan={mockLoan}
        setSelectedLoan={mockSetSelectedLoan}
        isSelected={true}
        setAddTransactionModalOpen={mockSetAddTransactionModalOpen}
      />
    );

    fireEvent.click(screen.getByText("Add Transaction"));
    expect(mockSetAddTransactionModalOpen).toHaveBeenCalledWith(true);
  });

  it("applies correct status class to badge", () => {
    const statuses = ["On time", "Late", "Defaulted", "Unknown"];

    statuses.forEach((status) => {
      cleanup();
      const loanWithStatus = {
        ...mockLoan,
        status,
      };

      render(
        <LoanCard
          loan={loanWithStatus}
          setSelectedLoan={mockSetSelectedLoan}
          isSelected={false}
          setAddTransactionModalOpen={mockSetAddTransactionModalOpen}
        />
      );

      const badge = screen.getByTestId("badge");
      const expectedClass =
        status === "On time"
          ? "on-time"
          : status === "Late"
          ? "late"
          : status === "Defaulted"
          ? "defaulted"
          : "other";
      expect(badge).toHaveClass(`loan-status-badge ${expectedClass}`);
    });
  });
});
