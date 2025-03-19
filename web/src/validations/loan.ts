export interface TransactionValidationError {
  amount?: string;
  date?: string;
}

export interface LoanCalculatorValidationError {
  principal?: string;
  rate?: string;
  months?: string;
}

export const validateTransactionAmount = (amount: number): string | undefined => {
  if (isNaN(amount)) {
    return "Amount must be a valid number";
  }
  if (amount <= 0) {
    return "Amount must be greater than 0";
  }
  return undefined;
};

export const validateTransactionDate = (date: string): string | undefined => {
  if (!date) {
    return "Date is required";
  }
  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate > today) {
    return "Date cannot be in the future";
  }
  
  return undefined;
};

export const validateTransaction = (
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

export const validateLoanCalculator = (
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
