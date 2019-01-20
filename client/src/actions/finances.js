import TYPES from '../constants/types';

export const getIncomes = () => ({ type: TYPES.GET_INCOMES });

export const getIncomesResume = () => ({ type: TYPES.GET_INCOMES_RESUME });

export const getExpenses = () => ({ type: TYPES.GET_EXPENSES });

export const getExpensesResume = () => ({ type: TYPES.GET_EXPENSES_RESUME });

export const addIncome = (income) => ({
  type: TYPES.ADD_INCOME,
  payload: {
    description: income.description,
    income_value: income.income_value
  }
});

export const addExpense = (expense) => ({
  type: TYPES.ADD_EXPENSE,
  payload: {
    description: expense.description,
    expense_value: expense.expense_value
  }
});

export const cleanCreatedIncome = () => ({
  type: TYPES.CLEAN_CREATED_INCOME
});

export const cleanCreatedExpense = () => ({
  type: TYPES.CLEAN_CREATED_EXPENSE
});
