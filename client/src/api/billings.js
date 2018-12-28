import ENDPOINTS from '../constants/endpoints';
import fetch from 'cross-fetch';

class BillingsApi {
  static getAll() {
    return fetch(ENDPOINTS.billings).then(response => {
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

  static getLast() {
    return fetch(`${ ENDPOINTS.billings }-last`).then(response => {
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