import TYPES from '../constants/types';

export const getBilling = (billing) => ({
  type: TYPES.GET_BILLING,
  payload: billing
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

export const addBilling = (billing) => ({
  type: TYPES.ADD_BILLING,
  payload: billing
});

export const cleanBilling = () => ({
  type: TYPES.CLEAN_BILLING
});
