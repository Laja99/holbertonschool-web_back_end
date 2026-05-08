import getBudgetObject from './7-getBudgetObject';

export default function getFullBudgetObject(income, gdp, capita) {
  const budget = getBudgetObject(income, gdp, capita);
  return {
    ...budget,
    getIncomeInDollars(income) { // لاحظي الاختصار هنا
      return `$${income}`;
    },
    getIncomeInEuros(income) {
      return `${income} euros`;
    },
  };
}
