import TYPES from '../constants/types';

const initState = {
  billings: [],
  billing: {
    subtotal: 0,
    iva: 0,
    total: 0,
    products: []
  }
};

const billings = (state = initState, action) => {
  switch(action.type) {
    case TYPES.GET_BILLING:
      if(action.payload !== undefined) {
        return  state;
      } else {
        return {
          ...state,
          billing: {
            subtotal: 0,
            iva: 0,
            total: 0,
            products: state.billing.products
          }
        }
      }
    case TYPES.ADD_PRODUCT_TO_BILLING:
      return {
        ...state,
        billing: {
          ...state.billing,
          total: state.billing.total + parseInt(action.payload.price),
          iva: (state.billing.total + parseInt(action.payload.price)) * 0.19,
          subtotal: (state.billing.total + parseInt(action.payload.price)) * 0.81,
          products: [
            {
              barcode: action.payload.barcode,
              description: action.payload.description,
              price: action.payload.price,
              quantity: action.payload.quantity
            },
            ...state.billing.products
          ],
        }
      }
    default:
      return state;
  }
}

export default billings;
