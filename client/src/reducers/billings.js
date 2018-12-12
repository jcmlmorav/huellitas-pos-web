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
      let addBillingState = { ...state };

      if( product ) {
        addBillingState = {
          ...addBillingState,
          billing: {
            ...addBillingState.billing,
            products: addBillingState.billing.products.map(product => 
              (product.barcode === action.payload.barcode) ?
              {
                ...product,
                quantity: product.quantity + 1
              } : product
            )
          }
        }
      } else {
        addBillingState = {
          ...addBillingState,
          billing: {
            ...addBillingState.billing,
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

      let addTotal = 0,
          addIva = 0,
          addSubtotal = 0,
          addProducts_quantity = 0;
      
      addBillingState.billing.products.forEach(product => {
        addTotal = addTotal + (product.price * product.quantity) * (1 - (product.discount / 100));
        addIva = (addTotal + (product.price * product.quantity) * (1 - (product.discount / 100))) * 0.19;
        addSubtotal = (addTotal + (product.price * product.quantity) * (1 - (product.discount / 100))) * 0.81;
        addProducts_quantity = addProducts_quantity + product.quantity;
      });

      addBillingState = {
        ...addBillingState,
        billing: {
          ...addBillingState.billing,
          total: addTotal.toFixed(2),
          iva: addIva.toFixed(2),
          subtotal: addSubtotal.toFixed(2),
          products_quantity: addProducts_quantity
        }
      }
      
      return addBillingState;
    case TYPES.REMOVE_PRODUCT_FROM_BILLING:
      let removeTotal = 0,
          removeIva = 0,
          removeSubtotal = 0,
          removeProducts_quantity = 0;
      
      let removeBillingsState = {
        ...state,
        billing: {
          ...state.billing,
          products: state.billing.products.filter(product => product.id !== action.payload.id)
        }
      }

      removeBillingsState.billing.products.forEach(product => {
        removeTotal = removeTotal + (product.price * product.quantity) * (1 - (product.discount / 100));
        removeIva = (removeIva + (product.price * product.quantity) * (1 - (product.discount / 100))) * 0.19;
        removeSubtotal = (removeSubtotal + (product.price * product.quantity) * (1 - (product.discount / 100))) * 0.81;
        removeProducts_quantity = removeProducts_quantity + product.quantity;
      });

      removeBillingsState = {
        ...removeBillingsState,
        billing: {
          ...removeBillingsState.billing,
          total: removeTotal.toFixed(2),
          iva: removeIva.toFixed(2),
          subtotal: removeSubtotal.toFixed(2),
          products_quantity: removeProducts_quantity
        }
      }

      return removeBillingsState;
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
