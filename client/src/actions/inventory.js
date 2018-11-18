import TYPES from '../constants/types';

export const addProduct = (product) => ({
  type: TYPES.ADD_PRODUCT,
  payload: {
    barcode: product.barcode,
    description: product.description,
    price: product.price,
    quantity: product.quantity
  }
});

export const getProducts = () => ({
  type: TYPES.GET_PRODUCTS
});

export const getProduct = (barcode) => ({
  type: TYPES.GET_PRODUCT,
  payload: barcode
});

export const updateProduct = (product) => ({
  type: TYPES.UPDATE_PRODUCT,
  payload: {
    barcode: product.barcode,
    description: product.description,
    price: product.price,
    quantity: product.quantity
  }
});
