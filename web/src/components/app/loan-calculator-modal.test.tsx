import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import LoanCalculatorModal from "./loan-calculator-modal";

expect.extend(matchers);

vi.mock("@/hooks/use-loan-calculator-validation", () => ({
  useLoanCalculatorValidation: (formData: {
    principal: string;
    rate: string;
    months: string;
  }) => {
    const errors: { principal?: string; rate?: string; months?: string } = {};

    if (parseFloat(formData.principal) <= 0) {
      errors.principal = "Principal must be greater than 0";
    }
    if (parseFloat(formData.rate) <= 0) {
      errors.rate = "Rate must be greater than 0";
    }
    if (parseFloat(formData.months) <= 0) {
      errors.months = "Months must be greater than 0";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  },
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
    id,
    type,
    placeholder,
    value,
    onChange,
    className,
  }: {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
  }) => (
    <input
      data-testid={`input-${id}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
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

describe("LoanCalculatorModal Component", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("renders when open is true", () => {
    render(<LoanCalculatorModal open={true} onClose={mockOnClose} />);

    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-header")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-title")).toBeInTheDocument();
    expect(screen.getByText("Loan Calculator")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(<LoanCalculatorModal open={false} onClose={mockOnClose} />);
    expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
  });

  it("renders all form inputs with correct labels", () => {
    render(<LoanCalculatorModal open={true} onClose={mockOnClose} />);

    expect(screen.getByTestId("label-principal")).toHaveTextContent(
      "Principal Amount"
    );
    expect(screen.getByTestId("label-rate")).toHaveTextContent(
      "Interest Rate (%)"
    );
    expect(screen.getByTestId("label-months")).toHaveTextContent(
      "Loan Term (Months)"
    );

    expect(screen.getByTestId("input-principal")).toBeInTheDocument();
    expect(screen.getByTestId("input-rate")).toBeInTheDocument();
    expect(screen.getByTestId("input-months")).toBeInTheDocument();
  });

  it("calculates loan correctly with valid inputs", () => {
    render(<LoanCalculatorModal open={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByTestId("input-principal"), {
      target: { value: "10000" },
    });
    fireEvent.change(screen.getByTestId("input-rate"), {
      target: { value: "13" },
    });
    fireEvent.change(screen.getByTestId("input-months"), {
      target: { value: "12" },
    });

    expect(screen.getByText("Total Interest:")).toBeInTheDocument();
    expect(screen.getByText("Total Amount:")).toBeInTheDocument();
  });

  it("shows error messages for invalid inputs", () => {
    render(<LoanCalculatorModal open={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByTestId("input-principal"), {
      target: { value: "-1000" },
    });
    fireEvent.change(screen.getByTestId("input-rate"), {
      target: { value: "-5" },
    });
    fireEvent.change(screen.getByTestId("input-months"), {
      target: { value: "0" },
    });

    expect(
      screen.getByText("Principal must be greater than 0")
    ).toBeInTheDocument();
    expect(screen.getByText("Rate must be greater than 0")).toBeInTheDocument();
    expect(
      screen.getByText("Months must be greater than 0")
    ).toBeInTheDocument();
  });

  it("calls onClose when dialog is closed", () => {
    render(<LoanCalculatorModal open={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByTestId("dialog-content"));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
