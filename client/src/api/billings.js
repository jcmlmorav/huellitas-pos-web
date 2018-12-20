import ENDPOINTS from '../constants/endpoints';
import fetch from 'cross-fetch';

class BillingsApi {
  static getAll() {
    return fetch(ENDPOINTS.bilings).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static get(id) {
    return fetch(`${ ENDPOINTS.billings }/${ id }`).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static add(billing) {
    return fetch(
      ENDPOINTS.billings,
      {
        method: 'POST',
        body: JSON.stringify(billing),
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

export default BillingsApi;  