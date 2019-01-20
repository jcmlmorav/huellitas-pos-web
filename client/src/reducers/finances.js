import TYPES from '../constants/types';

const initState = {
  incomes: [],
  expenses: [],
  incomesResume: 0,
  expensesResume: 0,
  error: {},
  createdIncome: {},
  createdExpense: {}
};

const finances = (state = initState, action) => {
  switch(action.type) {
    case TYPES.ADD_INCOME:
      return {
        ...state,
        createdIncome: {},
        error: {}
      }
    case TYPES.ADD_INCOME_SUCCEEDED:
      if(Object.keys(action.payload).length && 'error' in action.payload) {
        return {
          ...state,
          error: action.payload.error,
          createdIncome: {}
        }
      } else {
        return {
          ...state,
          error: {},
          incomes: [
            {
              id: action.payload.data.id,
              description: action.payload.data.description,
              income_value: action.payload.data.income_value,
              created_at: action.payload.data.created_at
            },
            ...state.incomes
          ],
          createdIncome: {
            id: action.payload.data.id,
            description: action.payload.data.description,
            income_value: action.payload.data.income_value,
            created_at: action.payload.data.created_at
          }
        }
      }
    case TYPES.ADD_INCOME_FAILED:
      return {
        ...state,
        createdIncome: {},
        error: {
          failed: 'Ocurrió un problema al agregar el ingreso. Intente nuevamente.'
        }
      }
    case TYPES.ADD_EXPENSE:
      return {
        ...state,
        createdExpense: {},
        error: {}
      }
    case TYPES.ADD_EXPENSE_SUCCEEDED:
      if(Object.keys(action.payload).length && 'error' in action.payload) {
        return {
          ...state,
          error: action.payload.error,
          createdExpense: {}
        }
      } else {
        return {
          ...state,
          error: {},
          expenses: [
            {
              id: action.payload.data.id,
              description: action.payload.data.description,
              expense_value: action.payload.data.expense_value,
              created_at: action.payload.data.created_at
            },
            ...state.expenses
          ],
          createdExpense: {
            id: action.payload.data.id,
            description: action.payload.data.description,
            expense_value: action.payload.data.expense_value,
            created_at: action.payload.data.created_at
          }
        }
      }
    case TYPES.ADD_EXPENSE_FAILED:
      return {
        ...state,
        createdExpense: {},
        error: {
          failed: 'Ocurrió un problema al agregar el egreso. Intente nuevamente.'
        }
      }
    case TYPES.GET_INCOMES:
      return { ...state, incomes: [] }
    case TYPES.GET_INCOMES_SUCCEEDED:
      return { ...state, incomes: action.payload }
    case TYPES.GET_INCOMES_FAILED:
      return { ...state, incomes: [], error: { failed: 'Ocurrió un problema al obtener los ingresos. Intente nuevamente.' } }
    case TYPES.GET_EXPENSES:
      return { ...state, expenses: [] }
    case TYPES.GET_EXPENSES_SUCCEEDED:
      return { ...state, expenses: action.payload }
    case TYPES.GET_EXPENSES_FAILED:
      return { ...state, expenses: [], error: { failed: 'Ocurrió un problema al obtener los egresos. Intente nuevamente.' } }
    case TYPES.GET_INCOMES_RESUME:
      return { ...state, incomesResume: 0 }
    case TYPES.GET_INCOMES_RESUME_SUCCEEDED:
      return { ...state, incomesResume: action.payload }
    case TYPES.GET_INCOMES_RESUME_FAILED:
      return { ...state, incomesResume: 0, error: { failed: 'Ocurrió un problema al obtener el total de los ingresos. Intente nuevamente.' } }
    case TYPES.GET_EXPENSES_RESUME:
      return { ...state, expensesResume: 0 }
    case TYPES.GET_EXPENSES_RESUME_SUCCEEDED:
      return { ...state, expensesResume: action.payload }
    case TYPES.GET_EXPENSES_RESUME_FAILED:
      return { ...state, expensesResume: 0, error: { failed: 'Ocurrió un problema al obtener el total de los egresos. Intente nuevamente.' } }
    case TYPES.CLEAN_CREATED_INCOME:
      return { ...state, createdIncome: {} }
    case TYPES.CLEAN_CREATED_EXPENSE:
      return { ...state, createdExpense: {} }
    default:
      return state;
  }
}

export default finances;
