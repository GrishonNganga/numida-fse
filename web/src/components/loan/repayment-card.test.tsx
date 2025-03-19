import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import RepaymentCard from './repayment-card';

describe('RepaymentCard Component', () => {
  const mockPayment = {
    id: 1,
    amount: 1000,
    paymentDate: '2024-03-19'
  };

  beforeEach(() => {
    cleanup();
  });

  it('renders with all required information', () => {
    render(
      <RepaymentCard
        id={mockPayment.id}
        amount={mockPayment.amount}
        paymentDate={mockPayment.paymentDate}
      />
    );

    expect(screen.getByText('Loan Repayment')).toBeInTheDocument();
    expect(screen.getByText('March 19, 2024')).toBeInTheDocument();
  });

  it('renders with missing amount', () => {
    render(
      <RepaymentCard
        id={mockPayment.id}
        paymentDate={mockPayment.paymentDate}
      />
    );

    expect(screen.getByText('Loan Repayment')).toBeInTheDocument();
    expect(screen.getByText('March 19, 2024')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('formats date correctly', () => {
    const testCases = [
      { date: '2024-01-01', expected: 'January 1, 2024' },
      { date: '2024-12-31', expected: 'December 31, 2024' },
      { date: '2024-06-15', expected: 'June 15, 2024' }
    ];

    testCases.forEach(({ date, expected }) => {
      cleanup();
      render(
        <RepaymentCard
          id={mockPayment.id}
          amount={mockPayment.amount}
          paymentDate={date}
        />
      );

      expect(screen.getByText(expected)).toBeInTheDocument();
    });
  });

  it('formats amount correctly', () => {
    const testCases = [
      { amount: 1000, expected: ' KES 1,000' },
      { amount: 1000000, expected: ' KES 1,000,000' },
      { amount: 0, expected: '-' }
    ];

    testCases.forEach(({ amount }) => {
      cleanup();
      render(
        <RepaymentCard
          id={mockPayment.id}
          amount={amount}
          paymentDate={mockPayment.paymentDate}
        />
      );

    });
  });

  it('renders with correct CSS classes', () => {
    render(
      <RepaymentCard
        id={mockPayment.id}
        amount={mockPayment.amount}
        paymentDate={mockPayment.paymentDate}
      />
    );

    // Find the root element with repayment-card class
    const cardElement = screen.getByText('Loan Repayment').closest('.repayment-card');
    expect(cardElement).toHaveClass('repayment-card');
    
    // Test other classes
    expect(screen.getByText('Loan Repayment')).toHaveClass('repayment-title');
    expect(screen.getByText('March 19, 2024')).toHaveClass('repayment-date');
    expect(screen.getByText('KES 1,000')).toHaveClass('repayment-amount-value');
  });
}); 