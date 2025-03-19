import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import "./loan-calculator-modal.css";
import { formatCurrency } from "@/lib/utils";
import { useLoanCalculatorValidation, LoanCalculatorFormData } from "@/hooks/use-loan-calculator-validation";

interface LoanCalculatorModalProps {
  open: boolean;
  onClose: () => void;
}

const LoanCalculatorModal = ({ open, onClose }: LoanCalculatorModalProps) => {
  const [formData, setFormData] = useState<LoanCalculatorFormData>({
    principal: "",
    rate: "13",
    months: "12",
  });
  const [result, setResult] = useState<number>(0);
  const { errors, isValid } = useLoanCalculatorValidation(formData);

  useEffect(() => {
    if (isValid) {
      const principal = parseFloat(formData.principal) || 0;
      const annualRate = parseFloat(formData.rate) || 13;
      const months = parseFloat(formData.months) || 12;

      // Annual rate to monthly rate
      const monthlyRate = annualRate / 12 / 100;

      // Monthly payment formula
      // M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
      // M = Monthly payment
      // P = Principal loan amount
      // r = Monthly interest rate
      // n = Total number of months
      const monthlyPayment =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
          (Math.pow(1 + monthlyRate, months) - 1) || 0;

      const totalAmount = monthlyPayment * months;
      const totalInterest = totalAmount - principal;

      setResult(totalInterest);
    } else {
      setResult(0);
    }
  }, [formData, isValid]);

  const principal = parseFloat(formData.principal) || 0;
  const totalAmount = principal + result;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>Loan Calculator</DialogTitle>
        </DialogHeader>

        <div className="calculator-form">
          <div className="form-group">
            <Label htmlFor="principal">Principal Amount</Label>
            <Input
              id="principal"
              type="number"
              placeholder="Enter principal amount"
              value={formData.principal}
              onChange={(e) =>
                setFormData({ ...formData, principal: e.target.value })
              }
              className={errors.principal ? "error" : ""}
            />
            {errors.principal && (
              <span className="error-message">{errors.principal}</span>
            )}
          </div>

          <div className="form-group">
            <Label htmlFor="rate">Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              placeholder="Enter interest rate"
              value={formData.rate}
              onChange={(e) =>
                setFormData({ ...formData, rate: e.target.value })
              }
              className={errors.rate ? "error" : ""}
            />
            {errors.rate && (
              <span className="error-message">{errors.rate}</span>
            )}
          </div>

          <div className="form-group">
            <Label htmlFor="months">Loan Term (Months)</Label>
            <Input
              id="months"
              type="number"
              placeholder="Enter loan term"
              value={formData.months}
              onChange={(e) =>
                setFormData({ ...formData, months: e.target.value })
              }
              className={errors.months ? "error" : ""}
            />
            {errors.months && (
              <span className="error-message">{errors.months}</span>
            )}
          </div>

          <div className="result">
            <div className="result-item">
              <span className="result-label">Total Interest:</span>
              <span className="result-value">
                {formatCurrency(result, true)}
              </span>
            </div>
            <div className="result-item">
              <span className="result-label">Total Amount:</span>
              <span className="result-value">
                {formatCurrency(totalAmount, true)}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoanCalculatorModal;
