import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { addTransaction } from "@/services/restful/loan";
import { useTransactionValidation, TransactionFormData } from "@/hooks/use-transaction-validation";
import "./add-transaction-modal.css";

const AddTransactionModal = ({
  open,
  onClose,
  paymentName,
  loanId,
  refetch,
}: {
  open: boolean;
  onClose: () => void;
  paymentName: string;
  loanId: string;
  refetch: () => void;
}) => {
  const [newTransaction, setNewTransaction] = useState<TransactionFormData>({
    amount: 0,
    date: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { errors, isValid } = useTransactionValidation(newTransaction);

  const handleAddTransaction = async () => {
    if (!isValid) return;

    setIsLoading(true);
    await addTransaction(loanId, newTransaction.amount, newTransaction.date);
    refetch();
    setIsLoading(false);
    setNewTransaction({
      amount: 0,
      date: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>New transaction for {paymentName}</DialogTitle>
        </DialogHeader>

        <div className="form-content">
          <h3>This will be added to the total amount of the loan</h3>
          <div className="form-group">
            <Label htmlFor="amount">Amount</Label>
            <Input
              name="amount"
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  amount: parseInt(e.target.value),
                })
              }
              className={errors.amount ? "error" : ""}
            />
            {errors.amount && <span className="error-message">{errors.amount}</span>}
          </div>
          <div className="form-group">
            <Label htmlFor="date">Date</Label>
            <Input
              name="date"
              type="date"
              placeholder="Date"
              value={newTransaction.date}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  date: e.target.value,
                })
              }
              className={errors.date ? "error" : ""}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>
          <div className="form-actions">
            <Button onClick={handleAddTransaction} disabled={!isValid}>
              {isLoading ? (
                <svg
                  className="spinner"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8V2z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                "Add"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionModal;
