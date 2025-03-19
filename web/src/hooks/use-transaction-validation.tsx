import { useState, useEffect } from "react";

export interface TransactionValidationError {
  amount?: string;
  date?: string;
}

export interface TransactionFormData {
  amount: number;
  date: string;
}

const validateTransactionAmount = (amount: number): string | undefined => {
  if (isNaN(amount)) {
    return "Amount must be a valid number";
  }
  if (amount <= 0) {
    return "Amount must be greater than 0";
  }
  return undefined;
};

const validateTransactionDate = (date: string): string | undefined => {
  if (!date) {
    return "Date is required";
  }
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate > today) {
    return "Date cannot be in the future";
  }
  
  return undefined;
};

const validateTransaction = (
  amount: number,
  date: string
): TransactionValidationError => {
  const errors: TransactionValidationError = {};
  
  const amountError = validateTransactionAmount(amount);
  if (amountError) {
    errors.amount = amountError;
  }
  
  const dateError = validateTransactionDate(date);
  if (dateError) {
    errors.date = dateError;
  }
  
  return errors;
};

export const useTransactionValidation = (formData: TransactionFormData) => {
  const [errors, setErrors] = useState<TransactionValidationError>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validationErrors = validateTransaction(formData.amount, formData.date);
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
  }, [formData]);

  return { errors, isValid };
}; 