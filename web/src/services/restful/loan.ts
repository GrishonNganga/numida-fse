const API_URL = import.meta.env.VITE_API_URL;

export const addTransaction = async (
  loanId: string,
  amount: number,
  date: string
) => {

  const response = await fetch(`${API_URL}/loans/${loanId}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, date }),
  });

  return response.json();
};
