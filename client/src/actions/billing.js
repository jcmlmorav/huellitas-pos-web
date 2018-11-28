import TYPES from '../constants/types';

export const getBilling = (billing) => ({
  type: TYPES.GET_BILLING,
  payload: billing
});

export const addProductToBilling = (product) => ({
  type: TYPES.ADD_PRODUCT_TO_BILLING,
  payload: {
    barcode: product.barcode,
    description: product.description,
    price: product.price,
    quantity: 1
  }
});
