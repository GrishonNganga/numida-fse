import { useState, useEffect } from "react";

export interface LoanCalculatorValidationError {
  principal?: string;
  rate?: string;
  months?: string;
}

export interface LoanCalculatorFormData {
  principal: string;
  rate: string;
  months: string;
}

const validateLoanCalculator = (
  principal: string,
  rate: string,
  months: string
): LoanCalculatorValidationError => {
  const errors: LoanCalculatorValidationError = {};

  // Validate principal only if it's not empty
  if (principal) {
    const principalNum = parseFloat(principal);
    if (isNaN(principalNum)) {
      errors.principal = "Principal must be a valid number";
    } else if (principalNum <= 0) {
      errors.principal = "Principal must be greater than 0";
    } else if (principalNum > 1000000) {
      errors.principal = "Principal cannot exceed 1,000,000";
    }
  }

  // Validate rate only if it's not empty
  if (rate) {
    const rateNum = parseFloat(rate);
    if (isNaN(rateNum)) {
      errors.rate = "Rate must be a valid number";
    } else if (rateNum <= 0) {
      errors.rate = "Rate must be greater than 0";
    } else if (rateNum > 100) {
      errors.rate = "Rate cannot exceed 100%";
    }
  }

  // Validate months only if it's not empty
  if (months) {
    const monthsNum = parseFloat(months);
    if (isNaN(monthsNum)) {
      errors.months = "Months must be a valid number";
    } else if (monthsNum <= 0) {
      errors.months = "Months must be greater than 0";
    } else if (monthsNum > 360) {
      errors.months = "Loan term cannot exceed 30 years (360 months)";
    }
  }

  return errors;
};

export const useLoanCalculatorValidation = (formData: LoanCalculatorFormData) => {
  const [errors, setErrors] = useState<LoanCalculatorValidationError>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validationErrors = validateLoanCalculator(
      formData.principal,
      formData.rate,
      formData.months
    );
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
  }, [formData]);

  return { errors, isValid };
}; 