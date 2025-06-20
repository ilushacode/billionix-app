function calculateTotalIncomeAndExpenses(businesses) {
  if (!Array.isArray(businesses)) {
    return { totalIncome: 0, totalExpenses: 0 };
  }

  return businesses.reduce(
    (acc, business) => {
      const income = typeof business.income === "number" ? business.income : 0;
      const expenses =
        typeof business.expenses === "number" ? business.expenses : 0;

      acc.totalIncome += income;
      acc.totalExpenses += expenses;

      return acc;
    },
    { totalIncome: 0, totalExpenses: 0 }
  );
}

export default calculateTotalIncomeAndExpenses