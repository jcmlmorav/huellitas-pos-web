import TYPES from '../constants/types';

const initState = {
  products: [],
  product: {},
  error: {},
  createdProduct: {}
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
              barcode: action.payload.data.barcode,
              description: action.payload.data.description,
              price: action.payload.data.price,
              quantity: action.payload.data.quantity,
              discount: action.payload.data.discount
            },
            ...state.products
          ],
          createdProduct: {
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
        createdProduct: {}
      }
    case TYPES.UPDATE_PRODUCT:
      	return {
          ...state,
          products: state.products.map(product => 
            (product.barcode === action.payload.barcode) ?
            {
              ...product,
              description: action.payload.description,
              price: action.payload.price,
              quantity: action.payload.quantity
            } : product
          )
        }
    default:
      return state;
  }
}

export default inventory;
