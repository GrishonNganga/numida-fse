import { useState } from "react";
import LoanCard from "./loan-card";
import LoanCardSkeleton from "./loan-card-skeleton";
import AddTransactionModal from "./add-transaction-modal";
import "./loan-list.css";
import { Loan } from "@/types";

const LoanList = ({
  loans,
  refetch,
  isLoading,
}: {
  loans: Loan[];
  refetch: () => void;
  isLoading?: boolean;
}) => {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [addTransactionModalOpen, setAddTransactionModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="loan-list">
        {[...Array(8)].map((_, index) => (
          <LoanCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="loan-list">
      {loans.map((loan) => (
        <LoanCard
          key={loan.id}
          loan={loan}
          setSelectedLoan={setSelectedLoan}
          isSelected={selectedLoan?.id === loan.id}
          setAddTransactionModalOpen={setAddTransactionModalOpen}
        />
      ))}
      <AddTransactionModal
        open={addTransactionModalOpen}
        onClose={() => setAddTransactionModalOpen(false)}
        paymentName={selectedLoan?.name ?? ""}
        loanId={selectedLoan?.id ?? ""}
        refetch={refetch}
      />
    </div>
  );
};

export default LoanList;
