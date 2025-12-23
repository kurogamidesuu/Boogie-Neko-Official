
export function formatCurrency(cur: number) {
  return new Intl.NumberFormat("en-IN", { style: 'currency', currency: 'INR' }).format(cur)
}