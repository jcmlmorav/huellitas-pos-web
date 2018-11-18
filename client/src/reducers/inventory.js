import TYPES from '../constants/types';

const initState = {
  products: [],
  product: {}
};

const inventory = (state = initState, action) => {
  switch(action.type) {
    case TYPES.ADD_PRODUCT:
      return {
        ...state,
        products: [
          {
            barcode: action.payload.barcode,
            description: action.payload.description,
            price: action.payload.price,
            quantity: action.payload.quantity
          },
          ...state.products
        ]
      }
    case TYPES.GET_PRODUCTS:
      return state
    case TYPES.GET_PRODUCT:
      return {
        ...state,
        product: state.products.find(product => product.barcode === action.payload) || {}
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
