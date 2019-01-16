import TYPES from '../constants/types';

export const getIncomes = () => ({ type: TYPES.GET_INCOMES });

export const getIncomesResume = () => ({ type: TYPES.GET_INCOMES_RESUME });

export const getExpenses = () => ({ type: TYPES.GET_EXPENSES });

export const getExpensesResume = () => ({ type: TYPES.GET_EXPENSES_RESUME });
