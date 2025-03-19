import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoanList from "./loan-list";
import { ExistingLoan } from "@/__generated__/graphql";
vi.mock("./loan-card", () => ({
  default: ({
    loan,
    setSelectedLoan,
    isSelected,
    setAddTransactionModalOpen,
  }: {
    loan: ExistingLoan;
    setSelectedLoan: (loan: ExistingLoan | null) => void;
    isSelected: boolean;
    setAddTransactionModalOpen: (open: boolean) => void;
  }) => (
    <div data-testid={`loan-card-${loan.id}`}>
      <div data-testid={`loan-name-${loan.id}`}>{loan.name}</div>
      <div data-testid={`loan-amount-${loan.id}`}>{loan.principal}</div>
      <button
        data-testid={`select-loan-${loan.id}`}
        onClick={() => setSelectedLoan(isSelected ? null : loan)}
      >
        {isSelected ? "Deselect" : "Select"}
      </button>
      <button
        data-testid={`add-transaction-${loan.id}`}
        onClick={() => setAddTransactionModalOpen(true)}
      >
        Add Transaction
      </button>
    </div>
  ),
}));

vi.mock("./loan-card-skeleton", () => ({
  default: () => <div data-testid="loan-card-skeleton">Loading...</div>,
}));

vi.mock("./add-transaction-modal", () => ({
  default: ({ open, onClose, paymentName, loanId, refetch }: { open: boolean; onClose: () => void; paymentName: string; loanId: string; refetch: () => void }) => (
    <div data-testid="add-transaction-modal">
      <div data-testid="modal-open-state">{open ? "Open" : "Closed"}</div>
      <div data-testid="modal-payment-name">{paymentName}</div>
      <div data-testid="modal-loan-id">{loanId}</div>
      <button data-testid="modal-close" onClick={onClose}>
        Close
      </button>
      <button data-testid="modal-refetch" onClick={refetch}>
        Refetch
      </button>
    </div>
  ),
}));

describe("LoanList Component", () => {
  const mockLoans = [
    {
      id: "1",
      name: "Loan 1",
      principal: 10000,
      status: "On time",
      daysOverdue: 0,
      payments: [],
    },
    {
      id: "2",
      name: "Loan 2",
      principal: 20000,
      status: "Late",
      daysOverdue: 5,
      payments: [],
    },
  ];

  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders loading state when isLoading is true", () => {
    render(<LoanList loans={[]} refetch={mockRefetch} isLoading={true} />);

    const skeletons = screen.getAllByTestId("loan-card-skeleton");
    expect(skeletons).toHaveLength(8);
  });

  it("renders empty state when no loans are provided", () => {
    render(<LoanList loans={[]} refetch={mockRefetch} isLoading={false} />);

    expect(screen.queryByTestId(/loan-card-/)).not.toBeInTheDocument();
  });

  it("renders all loans when provided", () => {
    render(
      <LoanList loans={mockLoans} refetch={mockRefetch} isLoading={false} />
    );

    mockLoans.forEach((loan) => {
      expect(screen.getByTestId(`loan-card-${loan.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`loan-name-${loan.id}`)).toHaveTextContent(
        loan.name
      );
      expect(screen.getByTestId(`loan-amount-${loan.id}`)).toHaveTextContent(
        String(loan.principal)
      );
    });
  });

  it("handles loan selection and deselection", () => {
    render(
      <LoanList loans={mockLoans} refetch={mockRefetch} isLoading={false} />
    );

    fireEvent.click(screen.getByTestId(`select-loan-${mockLoans[0].id}`));
    expect(
      screen.getByTestId(`loan-card-${mockLoans[0].id}`)
    ).toHaveTextContent("Deselect");

    fireEvent.click(screen.getByTestId(`select-loan-${mockLoans[0].id}`));
    expect(
      screen.getByTestId(`loan-card-${mockLoans[0].id}`)
    ).toHaveTextContent("Select");
  });

  it("opens add transaction modal when button is clicked", () => {
    render(
      <LoanList loans={mockLoans} refetch={mockRefetch} isLoading={false} />
    );

    fireEvent.click(screen.getByTestId(`select-loan-${mockLoans[0].id}`));
    fireEvent.click(screen.getByTestId(`add-transaction-${mockLoans[0].id}`));

    expect(screen.getByTestId("modal-open-state")).toHaveTextContent("Open");
    expect(screen.getByTestId("modal-payment-name")).toHaveTextContent(
      mockLoans[0].name
    );
    expect(screen.getByTestId("modal-loan-id")).toHaveTextContent(
      mockLoans[0].id
    );
  });

  it("closes add transaction modal when close button is clicked", () => {
    render(
      <LoanList loans={mockLoans} refetch={mockRefetch} isLoading={false} />
    );

    fireEvent.click(screen.getByTestId(`select-loan-${mockLoans[0].id}`));
    fireEvent.click(screen.getByTestId(`add-transaction-${mockLoans[0].id}`));

    fireEvent.click(screen.getByTestId("modal-close"));

    expect(screen.getByTestId("modal-open-state")).toHaveTextContent("Closed");
  });

  it("calls refetch when modal refetch button is clicked", () => {
    render(
      <LoanList loans={mockLoans} refetch={mockRefetch} isLoading={false} />
    );

    fireEvent.click(screen.getByTestId(`select-loan-${mockLoans[0].id}`));
    fireEvent.click(screen.getByTestId(`add-transaction-${mockLoans[0].id}`));
    fireEvent.click(screen.getByTestId("modal-refetch"));

    expect(mockRefetch).toHaveBeenCalled();
  });
});
