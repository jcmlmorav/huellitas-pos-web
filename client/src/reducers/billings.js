import TYPES from '../constants/types';

const initState = {
  billings: [],
  createdBilling: {},
  billing: {
    subtotal: 0,
    iva: 0,
    brute: 0,
    discount: 0,
    coupon: 0,
    coupon_discount: 0,
    total: 0,
    products_quantity: 0,
    products: []
  },
  lastBilling: {},
  billingDetailed: {}
};

const billings = (state = initState, action) => {
  switch (action.type) {
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
      if (action.payload !== undefined) {
        return state;
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

      if (product) {
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

      let add_coupon_discount = addTotal.toFixed(0) * (addBillingState.billing.coupon / 100);
      const add50s = add_coupon_discount / 50;
      const add_units = add50s % 1 > 0 ? Math.floor(add50s) + 1 : add50s;
      add_coupon_discount = add_units * 50;

      addBillingState = {
        ...addBillingState,
        billing: {
          ...addBillingState.billing,
          total: parseInt(addTotal.toFixed(0)) - add_coupon_discount,
          iva: addIva.toFixed(0),
          brute: addBrute.toFixed(0),
          discount: addDiscount.toFixed(0),
          subtotal: addSubtotal.toFixed(0),
          coupon_discount: add_coupon_discount,
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

      let remove_coupon_discount = removeTotal.toFixed(0) * (removeBillingsState.billing.coupon / 100);
      const remove50s = remove_coupon_discount / 50;
      const remove_units = remove50s % 1 > 0 ? Math.floor(remove50s) + 1 : remove50s;
      remove_coupon_discount = remove_units * 50;

      removeBillingsState = {
        ...removeBillingsState,
        billing: {
          ...removeBillingsState.billing,
          total: removeTotal.toFixed(0) - remove_coupon_discount,
          iva: removeIva.toFixed(2),
          brute: removeBrute.toFixed(0),
          discount: removeDiscount.toFixed(0),
          subtotal: removeSubtotal.toFixed(0),
          coupon_discount: remove_coupon_discount,
          products_quantity: removeProducts_quantity
        }
      }

      return removeBillingsState;
    case TYPES.UPDATE_BILLING_COUPON:
      let billingCoupon = { ...state };

      let coupon_discount = billingCoupon.billing.brute * (action.payload.coupon / 100);
      const _50s = coupon_discount / 50;
      const units = _50s % 1 > 0 ? Math.floor(_50s) + 1 : _50s;
      coupon_discount = units * 50;

      return {
        ...billingCoupon,
        billing: {
          ...billingCoupon.billing,
          total: billingCoupon.billing.brute - coupon_discount,
          coupon: parseInt(action.payload.coupon),
          coupon_discount: coupon_discount
        }
      };
    case TYPES.CLEAN_BILLING:
      return {
        ...state,
        billing: {
          subtotal: 0,
          iva: 0,
          total: 0,
          brute: 0,
          discount: 0,
          coupon: 0,
          coupon_discount: 0,
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

      let q_coupon_discount = qTotal.toFixed(0) * (billingState.billing.coupon / 100);
      const q50s = q_coupon_discount / 50;
      const q_units = q50s % 1 > 0 ? Math.floor(q50s) + 1 : q50s;
      q_coupon_discount = q_units * 50;

      billingState = {
        ...billingState,
        billing: {
          ...billingState.billing,
          total: parseInt(qTotal.toFixed(0)) - q_coupon_discount,
          iva: qIva.toFixed(2),
          brute: qBrute.toFixed(0),
          discount: qDiscount.toFixed(0),
          subtotal: qSubtotal.toFixed(0),
          coupon_discount: q_coupon_discount,
          products_quantity: qProducts_quantity
        }
      }

      return billingState;
    default:
      return state;
  }
}

export default billings;
