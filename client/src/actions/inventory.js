import TYPES from '../constants/types';

export const addProduct = (product) => ({
  type: TYPES.ADD_PRODUCT,
  payload: {
    barcode: product.barcode,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    discount: product.discount,
    active: product.active
  }
});

export const getProducts = () => ({
  type: TYPES.GET_PRODUCTS
});

export const getProduct = (term) => ({
  type: TYPES.GET_PRODUCT,
  payload: term
});

export const updateProduct = (product) => ({
  type: TYPES.UPDATE_PRODUCT,
  payload: {
    id: product.id,
    barcode: product.barcode,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    discount: product.discount,
    active: product.active
  }
});

export const cleanSelectedProduct = () => ({
  type: TYPES.CLEAN_SELECTED_PRODUCT
});

export const cleanSelectedProducts = () => ({
  type: TYPES.CLEAN_SELECTED_PRODUCTS
});

export const setSelectedProduct = (product) => ({
  type: TYPES.SET_SELECTED_PRODUCT,
  payload: product
});
