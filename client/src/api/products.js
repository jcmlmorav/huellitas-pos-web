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

  static get(term) {
    return fetch(`${ ENDPOINTS.products }/${ term }`).then(response => {
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

  static update(product) {
    return fetch(
      `${ ENDPOINTS.products }/${ product.id }`,
      {
        method: 'PUT',
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