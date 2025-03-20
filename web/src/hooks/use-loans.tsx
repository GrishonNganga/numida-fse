import { useQuery } from "@apollo/client";
import { useMemo, useEffect, useState } from "react";
import { GET_LOANS } from "@/services/graphql/loan";
import { GetLoansQuery } from "@/__generated__/graphql";
import { Loan } from "@/types";

export const useLoans = (searchFilter: string) => {
  const [debouncedFilter, setDebouncedFilter] = useState(searchFilter);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(searchFilter);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchFilter]);

  const { data, loading, refetch } = useQuery<GetLoansQuery>(GET_LOANS, {
    variables: {
      filters: {
        name: debouncedFilter,
      },
    },
  });

  const getPaymentInfo = (
    payments:
      | ({
          __typename?: "LoanPayment";
          id: string;
          paymentDate: string;
          amount?: number | null;
        } | null)[]
      | null
      | undefined
  ) => {
    if (!payments?.length)
      return { status: "Unpaid", daysOverdue: 0, totalPaid: 0 };

    const latestPayment = new Date(
      Math.max(
        ...payments.map((p) => (p ? new Date(p.paymentDate).getTime() : 0))
      )
    );
    const daysSincePayment = Math.floor(
      (new Date().getTime() - latestPayment.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPaid = payments.reduce(
      (sum, payment) => sum + (payment?.amount || 0),
      0
    );

    const baseInfo = {
      totalPaid,
      daysOverdue: daysSincePayment > 7 ? daysSincePayment - 7 : 0,
    };

    if (daysSincePayment < 6) return { ...baseInfo, status: "On time" };
    if (daysSincePayment > 30) return { ...baseInfo, status: "Defaulted" };
    return { ...baseInfo, status: "Late" };
  };

  const loansWithStatus = useMemo(
    () =>
      data?.loans?.map((loan) => {
        const paymentInfo = getPaymentInfo(loan?.payments);
        return {
          ...loan,
          status: paymentInfo.status,
          daysOverdue: paymentInfo.daysOverdue,
          totalPaid: paymentInfo.totalPaid,
          payments: loan?.payments
            ? [...loan.payments].sort(
                (a, b) =>
                  new Date(b?.paymentDate).getTime() -
                  new Date(a?.paymentDate).getTime()
              )
            : [],
        } as Loan;
      }) || [],
    [data?.loans]
  );

  return {
    loans: loansWithStatus,
    loading,
    refetch,
  };
};
