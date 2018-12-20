import TYPES from '../constants/types';

const initState = {
  sales: [],
  salesResume: 0,
  error: {}
};

const billings = (state = initState, action) => {
  switch(action.type) {
    case TYPES.GET_SALES:
      return {
        ...state,
        sales: []
      }
    case TYPES.GET_SALES_SUCCEEDED:
      return {
        ...state,
        sales: action.payload
      }
    case TYPES.GET_SALES_FAILED:
      return {
        ...state,
        sales: [],
        error: {
          failed: 'Ocurrió un problema al obtener las ventas. Intente nuevamente.'
        }
      }
    case TYPES.GET_SALES_RESUME:
      return {
        ...state,
        salesResume: 0
      }
    case TYPES.GET_SALES_RESUME_SUCCEEDED:
      return {
        ...state,
        salesResume: action.payload
      }
    case TYPES.GET_SALES_RESUME_FAILED:
      return {
        ...state,
        salesResume: 0,
        error: {
          failed: 'Ocurrió un problema al obtener el total de ventas. Intente nuevamente.'
        }
      }
    default:
      return state;
  }
}

export default billings;
