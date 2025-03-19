import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import AddTransactionModal from "./add-transaction-modal";
import { addTransaction } from "@/services/restful/loan";

expect.extend(matchers);

vi.mock("@/hooks/use-transaction-validation", () => ({
  useTransactionValidation: (formData: { amount: number; date: string }) => {
    const errors: { amount?: string; date?: string } = {};

    if (formData.amount <= 0) {
      errors.amount = "Amount must be greater than 0";
    }
    if (!formData.date) {
      errors.date = "Date is required";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  },
}));

vi.mock("@/services/restful/loan", () => ({
  addTransaction: vi.fn(),
}));

vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({
    open,
    children,
    onOpenChange,
  }: {
    open?: boolean;
    children: React.ReactNode;
    onOpenChange: () => void;
  }) => {
    if (!open) return null;
    return (
      <div data-testid="dialog" onClick={onOpenChange}>
        {children}
      </div>
    );
  },
  DialogContent: ({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose: () => void;
  }) => (
    <div data-testid="dialog-content" onClick={onClose}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-title">{children}</div>
  ),
}));

vi.mock("@/components/ui/input", () => ({
  Input: ({
    name,
    type,
    placeholder,
    value,
    onChange,
  }: {
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <input
      data-testid={`input-${name}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  ),
}));

vi.mock("@/components/ui/label", () => ({
  Label: ({
    htmlFor,
    children,
  }: {
    htmlFor: string;
    children: React.ReactNode;
  }) => (
    <label htmlFor={htmlFor} data-testid={`label-${htmlFor}`}>
      {children}
    </label>
  ),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({
    onClick,
    disabled,
    children,
  }: {
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
  }) => (
    <button data-testid="submit-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

describe("AddTransactionModal Component", () => {
  const mockOnClose = vi.fn();
  const mockRefetch = vi.fn();
  const mockPaymentName = "Test Payment";
  const mockLoanId = "123";

  beforeEach(() => {
    mockOnClose.mockClear();
    mockRefetch.mockClear();
    vi.clearAllMocks();
  });

  it("renders when open is true", () => {
    render(
      <AddTransactionModal
        open={true}
        onClose={mockOnClose}
        paymentName={mockPaymentName}
        loanId={mockLoanId}
        refetch={mockRefetch}
      />
    );

    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-header")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-title")).toBeInTheDocument();
    expect(
      screen.getByText(`New transaction for ${mockPaymentName}`)
    ).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(
      <AddTransactionModal
        open={false}
        onClose={mockOnClose}
        paymentName={mockPaymentName}
        loanId={mockLoanId}
        refetch={mockRefetch}
      />
    );
    expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
  });

  it("renders all form inputs with correct labels", () => {
    render(
      <AddTransactionModal
        open={true}
        onClose={mockOnClose}
        paymentName={mockPaymentName}
        loanId={mockLoanId}
        refetch={mockRefetch}
      />
    );

    expect(screen.getByTestId("label-amount")).toHaveTextContent("Amount");
    expect(screen.getByTestId("label-date")).toHaveTextContent("Date");
    expect(screen.getByTestId("input-amount")).toBeInTheDocument();
    expect(screen.getByTestId("input-date")).toBeInTheDocument();
  });

  it("shows error messages for invalid inputs", () => {
    render(
      <AddTransactionModal
        open={true}
        onClose={mockOnClose}
        paymentName={mockPaymentName}
        loanId={mockLoanId}
        refetch={mockRefetch}
      />
    );

    fireEvent.change(screen.getByTestId("input-amount"), {
      target: { value: "-1000" },
    });
    fireEvent.change(screen.getByTestId("input-date"), {
      target: { value: "" },
    });

    expect(
      screen.getByText("Amount must be greater than 0")
    ).toBeInTheDocument();
    expect(screen.getByText("Date is required")).toBeInTheDocument();
  });

  it("submits form with valid inputs", async () => {
    const mockAmount = 1000;
    const mockDate = "2024-03-19";

    render(
      <AddTransactionModal
        open={true}
        onClose={mockOnClose}
        paymentName={mockPaymentName}
        loanId={mockLoanId}
        refetch={mockRefetch}
      />
    );

    fireEvent.change(screen.getByTestId("input-amount"), {
      target: { value: mockAmount },
    });
    fireEvent.change(screen.getByTestId("input-date"), {
      target: { value: mockDate },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(addTransaction).toHaveBeenCalledWith(
        mockLoanId,
        mockAmount,
        mockDate
      );
      expect(mockRefetch).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("calls onClose when dialog is closed", () => {
    render(
      <AddTransactionModal
        open={true}
        onClose={mockOnClose}
        paymentName={mockPaymentName}
        loanId={mockLoanId}
        refetch={mockRefetch}
      />
    );

    fireEvent.click(screen.getByTestId("dialog-content"));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("disables submit button when form is invalid", () => {
    render(
      <AddTransactionModal
        open={true}
        onClose={mockOnClose}
        paymentName={mockPaymentName}
        loanId={mockLoanId}
        refetch={mockRefetch}
      />
    );

    fireEvent.change(screen.getByTestId("input-amount"), {
      target: { value: "-1000" },
    });
    fireEvent.change(screen.getByTestId("input-date"), {
      target: { value: "" },
    });

    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });
});
