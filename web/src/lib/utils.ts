export const formatCurrency = (amount: number, floating = false) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: floating ? 2 : 0,
    maximumFractionDigits: floating ? 2 : 0,
  }).format(amount);
};
