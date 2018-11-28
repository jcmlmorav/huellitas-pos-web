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
            ...state.billing,
            products: state.billing.products
          }
        }
      }
    case TYPES.ADD_PRODUCT_TO_BILLING:
      let product = state.billing.products.find(product => product.barcode === action.payload.barcode);
      let newState = {
        ...state,
        billing: {
          ...state.billing,
          total: Math.round(state.billing.total + parseInt(action.payload.price)),
          iva: Math.round((state.billing.total + parseInt(action.payload.price)) * 0.19),
          subtotal: Math.round((state.billing.total + parseInt(action.payload.price)) * 0.81)
        }
      };

      if( product ) {
        newState = {
          ...newState,
          billing: {
            ...newState.billing,
            products: newState.billing.products.map(product => 
              (product.barcode === action.payload.barcode) ?
              {
                ...product,
                quantity: product.quantity + 1
              } : product
            )
          }
        }
      } else {
        newState = {
          ...newState,
          billing: {
            ...newState.billing,
            products: [
              {
                barcode: action.payload.barcode,
                description: action.payload.description,
                price: action.payload.price,
                quantity: action.payload.quantity
              },
              ...state.billing.products
            ]
          }
        }
      }
      
      return newState;
    default:
      return state;
  }
}

export default billings;
