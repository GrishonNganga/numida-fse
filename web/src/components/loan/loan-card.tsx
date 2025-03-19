import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import RepaymentCard from "./repayment-card";
import { Button } from "../ui/button";
import "./loan-card.css";
import { ExistingLoan } from "@/__generated__/graphql";
const LoanCard = ({
  loan,
  setSelectedLoan,
  isSelected,
  setAddTransactionModalOpen,
}: {
  loan: ExistingLoan;
  setSelectedLoan: (loan: ExistingLoan) => void;
  isSelected: boolean;
  setAddTransactionModalOpen: (open: boolean) => void;
}) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "On time":
        return "on-time";
      case "Late":
        return "late";
      case "Defaulted":
        return "defaulted";
      default:
        return "other";
    }
  };

  return (
    <div className="loan-card">
      <div
        className="loan-header"
        onClick={() => setSelectedLoan(isSelected ? null : loan)}
      >
        <div className="loan-icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="loan-icon"
          >
            <path
              fillRule="evenodd"
              d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
            <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
          </svg>
        </div>

        <div className="loan-info">
          <h2 className="loan-name">{loan.name}</h2>
          <h4 className="loan-amount">{formatCurrency(loan.principal)}</h4>
          {loan.daysOverdue > 0 && (
            <h4 className="loan-status">Overdue {loan.daysOverdue} days</h4>
          )}
        </div>

        <div className="loan-actions">
          <Badge className={`loan-status-badge ${getStatusClass(loan.status)}`}>
            {loan.status}
          </Badge>
          <div className="loan-details-icon-container">
            {isSelected ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="loan-details-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="loan-details-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      {isSelected && (
        <div className="loan-details">
          <div className="transactions-header">
            <h4>Transactions</h4>
            <Button onClick={() => setAddTransactionModalOpen(true)}>
              Add Transaction
            </Button>
          </div>
            {loan.payments?.filter((payment): payment is NonNullable<typeof payment> => payment !== null).map((payment) => (
            <RepaymentCard
              key={payment.id}
              id={Number(payment.id)}
              amount={payment.amount ?? 0}
              paymentDate={payment.paymentDate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanCard;
