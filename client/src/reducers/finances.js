import TYPES from '../constants/types';

const initState = {
  incomes: [],
  expenses: [],
  incomesResume: 0,
  expensesResume: 0
};

const finances = (state = initState, action) => {
  switch(action.type) {
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
    default:
      return state;
  }
}

export default finances;
