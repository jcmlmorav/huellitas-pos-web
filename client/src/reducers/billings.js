import TYPES from '../constants/types';

const initState = {
  billings: [],
  createdBilling: {},
  billing: {
    subtotal: 0,
    iva: 0,
    total: 0,
    products_quantity: 0,
    products: []
  }
};

const billings = (state = initState, action) => {
  switch(action.type) {
    case TYPES.ADD_BILLING:
      return {
        ...state,
        createdBilling: {}
      }
    case TYPES.ADD_BILLING_SUCCEEDED:
      return {
        ...state,
        createdBilling: action.payload.data,
        billing: {
          subtotal: 0,
          iva: 0,
          total: 0,
          products_quantity: 0,
          products: []
        },
        error: {}
      }
    case TYPES.ADD_BILLING_FAILED:
      return {
        ...state,
        createdBilling: {},
        error: {
          failed: 'Ocurrió un problema al crear la factura. Intente nuevamente.'
        }
      }
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
          total: Math.round(state.billing.total + parseInt(action.payload.price * (1 - (action.payload.discount / 100)))),
          iva: Math.round((state.billing.total + parseInt(action.payload.price * (1 - (action.payload.discount / 100)))) * 0.19),
          subtotal: Math.round((state.billing.total + parseInt(action.payload.price * (1 - (action.payload.discount / 100)))) * 0.81),
          products_quantity: state.billing.products_quantity + 1
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
                id: action.payload.id,
                barcode: action.payload.barcode,
                description: action.payload.description,
                price: action.payload.price,
                quantity: action.payload.quantity,
                discount: action.payload.discount
              },
              ...state.billing.products
            ]
          }
        }
      }
      
      return newState;
    case TYPES.CLEAN_BILLING:
      return {
        ...state,
        billing: {
          subtotal: 0,
          iva: 0,
          total: 0,
          products_quantity: 0,
          products: []
        }
      }
    default:
      return state;
  }
}

export default billings;
