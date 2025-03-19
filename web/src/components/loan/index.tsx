import Title from "./title";
import LoanList from "./loan-list";
import { useLoans } from "@/hooks/use-loans";
import "./loans.css";
import { useState } from "react";

const Loans = () => {
  const [searchFilter, setSearchFilter] = useState("");

  const { loans, loading, refetch } = useLoans(searchFilter);
  return (
    <div className="loans-container">
      <Title searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
      <LoanList loans={loans} refetch={refetch} isLoading={loading} />
    </div>
  );
};

export default Loans;
