import TYPES from '../constants/types';

export const getBillings = () => ({
  type: TYPES.GET_BILLINGS
});

export const getBilling = (billing) => ({
  type: TYPES.GET_BILLING,
  payload: billing
});

export const getBillingById = (id) => ({
  type: TYPES.GET_BILLING_BY_ID,
  payload: id
});

export const getLastBilling = () => ({
  type: TYPES.GET_LAST_BILLING
});

export const addProductToBilling = (product) => ({
  type: TYPES.ADD_PRODUCT_TO_BILLING,
  payload: {
    id: product.id,
    barcode: product.barcode,
    description: product.description,
    price: product.price,
    quantity: 1,
    discount: product.discount
  }
});

export const addBilling = (billing, money, change) => {
  billing.money = money;
  billing.change = change;

  return {
    type: TYPES.ADD_BILLING,
    payload: billing
  }
};

export const cleanBilling = () => ({
  type: TYPES.CLEAN_BILLING
});

export const removeProductFromBilling = (product) => ({
  type: TYPES.REMOVE_PRODUCT_FROM_BILLING,
  payload: product
});

export const updateProductQuantity = (id, quantity) => ({
  type: TYPES.UPDATE_PRODUCT_QUANTITY,
  payload: { id, quantity }
});

export const updateCoupon = (coupon) => ({
  type: TYPES.UPDATE_BILLING_COUPON,
  payload: { coupon }
});
