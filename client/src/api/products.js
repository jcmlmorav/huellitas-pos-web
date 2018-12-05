import ENDPOINTS from '../constants/endpoints';
import fetch from 'cross-fetch'

class ProductsApi {
  static getAll() {
    return fetch(ENDPOINTS.products).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static add(product) {
    return fetch(
      ENDPOINTS.products,
      {
        method: 'POST',
        body: JSON.stringify(product),
        headers:{
          'Content-Type': 'application/json'
        }
      }
    ).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default ProductsApi;  