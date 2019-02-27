import TYPES from '../constants/types';

const initState = {
  billings: [],
  createdBilling: {},
  billing: {
    subtotal: 0,
    iva: 0,
    brute: 0,
    discount: 0,
    total: 0,
    products_quantity: 0,
    products: []
  },
  lastBilling: {},
  billingDetailed: {}
};

const billings = (state = initState, action) => {
  switch(action.type) {
    case TYPES.GET_BILLINGS:
      return {
        ...state,
        billings: []
      }
    case TYPES.GET_BILLINGS_SUCCEEDED:
      return {
        ...state,
        billings: action.payload
      }
    case TYPES.GET_BILLINGS_FAILED:
      return {
        ...state,
        billings: [],
        error: {
          failed: 'Ocurrió un problema al obtener las facturas. Intente nuevamente.'
        }
      }
    case TYPES.GET_LAST_BILLING:
      return {
        ...state,
        lastBilling: {}
      }
    case TYPES.GET_LAST_BILLING_SUCCEEDED:
      return {
        ...state,
        lastBilling: action.payload
      }
    case TYPES.GET_LAST_BILLING_FAILED:
      return {
        ...state,
        lastBilling: {},
        error: {
          failed: 'Ocurrió un problema al obtener la última factura. Intente nuevamente.'
        }
      }
    case TYPES.GET_BILLING_BY_ID:
      return {
        ...state,
        billingDetailed: {}
      }
    case TYPES.GET_BILLING_BY_ID_SUCCEEDED:
      return {
        ...state,
        billingDetailed: action.payload
      }
    case TYPES.GET_BILLING_BY_ID_FAILED:
      return {
        ...state,
        billingDetailed: {},
        error: {
          failed: 'Ocurrió un problema al obtener la factura. Intente nuevamente.'
        }
      }
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
          brute: 0,
          discount: 0,
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
          addBrute = 0,
          addDiscount = 0,
          addSubtotal = 0,
          addProducts_quantity = 0;
      
      addBillingState.billing.products.forEach(product => {
        addTotal = addTotal + (product.price * product.quantity) * (1 - (product.discount / 100));
        addIva = (addIva + (product.price * product.quantity) * (1 - (product.discount / 100))) * 0.19;
        addBrute = (addBrute + (product.price * product.quantity));
        addDiscount = (addDiscount + ((product.price * product.quantity) * (product.discount / 100)));
        addSubtotal = (addSubtotal + (product.price * product.quantity) * (1 - (product.discount / 100))) * 0.81;
        addProducts_quantity = addProducts_quantity + product.quantity;
      });

      addBillingState = {
        ...addBillingState,
        billing: {
          ...addBillingState.billing,
          total: addTotal.toFixed(2),
          iva: addIva.toFixed(2),
          brute: addBrute.toFixed(2),
          discount: addDiscount.toFixed(2),
          subtotal: addSubtotal.toFixed(2),
          products_quantity: addProducts_quantity
        }
      }
      
      return addBillingState;
    case TYPES.REMOVE_PRODUCT_FROM_BILLING:
      let removeTotal = 0,
          removeIva = 0,
          removeBrute = 0,
          removeDiscount = 0,
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
        removeBrute = (removeBrute + (product.price * product.quantity));
        removeDiscount = (removeDiscount + ((product.price * product.quantity) * (product.discount / 100)));
        removeSubtotal = (removeSubtotal + (product.price * product.quantity) * (1 - (product.discount / 100))) * 0.81;
        removeProducts_quantity = removeProducts_quantity + product.quantity;
      });

      removeBillingsState = {
        ...removeBillingsState,
        billing: {
          ...removeBillingsState.billing,
          total: removeTotal.toFixed(2),
          iva: removeIva.toFixed(2),
          brute: removeBrute.toFixed(2),
          discount: removeDiscount.toFixed(2),
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
          brute: 0,
          discount: 0,
          products_quantity: 0,
          products: []
        }
      }
    case TYPES.UPDATE_PRODUCT_QUANTITY:
      let billingState = {
        ...state,
        billing: {
          ...state.billing,
          products: state.billing.products.map(product => {
            if ((product.id === action.payload.id) && action.payload.quantity > 0) product.quantity = parseInt(action.payload.quantity);
            return product;
          })
        }
      };

      let qTotal = 0,
          qIva = 0,
          qBrute = 0,
          qDiscount = 0,
          qSubtotal = 0,
          qProducts_quantity = 0;
      
      billingState.billing.products.forEach(product => {
        qTotal = qTotal + (product.price * product.quantity) * (1 - (product.discount / 100));
        qIva = (qIva + (product.price * product.quantity) * (1 - (product.discount / 100))) * 0.19;
        qBrute = (qBrute + (product.price * product.quantity));
        qDiscount = (qDiscount + ((product.price * product.quantity) * (product.discount / 100)));
        qSubtotal = (qSubtotal + (product.price * product.quantity) * (1 - (product.discount / 100))) * 0.81;
        qProducts_quantity = qProducts_quantity + product.quantity;
      });

      billingState = {
        ...billingState,
        billing: {
          ...billingState.billing,
          total: qTotal.toFixed(2),
          iva: qIva.toFixed(2),
          brute: qBrute.toFixed(2),
          discount: qDiscount.toFixed(2),
          subtotal: qSubtotal.toFixed(2),
          products_quantity: qProducts_quantity
        }
      }
      
      return billingState;
    default:
      return state;
  }
}

export default billings;
