import TYPES from '../constants/types';

const initState = {
  products: [],
  product: {},
  error: {},
  createdProduct: {},
  updatedProduct: {}
};

const inventory = (state = initState, action) => {
  switch(action.type) {
    case TYPES.ADD_PRODUCT:
      return {
        ...state,
        createdProduct: {},
        error: {}
      }
    case TYPES.ADD_PRODUCT_SUCCEEDED:
      if(Object.keys(action.payload).length && 'error' in action.payload) {
        return {
          ...state,
          error: action.payload.error,
          createdProduct: {}
        }
      } else {
        return {
          ...state,
          error: {},
          products: [
            {
              id: action.payload.data.id,
              barcode: action.payload.data.barcode,
              description: action.payload.data.description,
              price: action.payload.data.price,
              quantity: action.payload.data.quantity,
              discount: action.payload.data.discount
            },
            ...state.products
          ],
          createdProduct: {
            id: action.payload.data.id,
            barcode: action.payload.data.barcode,
            description: action.payload.data.description,
            price: action.payload.data.price,
            quantity: action.payload.data.quantity,
            discount: action.payload.data.discount
          }
        }
      }
    case TYPES.ADD_PRODUCT_FAILED:
      return {
        ...state,
        createdProduct: {},
        error: {
          failed: 'Ocurrió un problema al agregar el producto. Intente nuevamente.'
        }
      }
    case TYPES.GET_PRODUCTS:
      return {
        ...state,
        products: null,
        createdProduct: {},
        updatedProduct: {},
        error: {}
      }
    case TYPES.GET_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        products: action.payload,
        error: {}
      }
    case TYPES.GET_PRODUCTS_FAILED:
      return {
        ...state,
        products: null,
        error: {
          failed: 'Ocurrió un problema al listar los productos. Intente nuevamente.'
        }
      }
    case TYPES.GET_PRODUCT:
      return {
        ...state,
        product: state.products.find(product => product.barcode === action.payload) || {},
        createdProduct: {},
        updatedProduct: {},
      }
    case TYPES.UPDATE_PRODUCT:
      return {
        ...state,
        updatedProduct: {},
        error: {}
      }
    case TYPES.UPDATE_PRODUCT_SUCCEEDED:
      if(Object.keys(action.payload).length && 'error' in action.payload) {
        return {
          ...state,
          error: action.payload.error,
          updatedProduct: {}
        }
      } else {
        return {
          ...state,
          error: {},
          products: state.products.map(product => (
            product.barcode === action.payload.data.barcode) ?
            {
              ...product,
              description: action.payload.data.description,
              price: action.payload.data.price,
              quantity: action.payload.data.quantity,
              discount: action.payload.data.discount
            } : product
          ),
          updatedProduct: {
            id: action.payload.data.id,
            barcode: action.payload.data.barcode,
            description: action.payload.data.description,
            price: action.payload.data.price,
            quantity: action.payload.data.quantity,
            discount: action.payload.data.discount
          }
        }
      }
    case TYPES.UPDATE_PRODUCT_FAILED:
      return {
        ...state,
        updatedProduct: {},
        error: {
          failed: 'Ocurrió un problema al agregar el producto. Intente nuevamente.'
        }
      }
    default:
      return state;
  }
}

export default inventory;
