import ENDPOINTS from '../constants/endpoints';
import fetch from 'cross-fetch';

class SalesApi {
  static getAll() {
    return fetch(ENDPOINTS.sales).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getResume() {
    return fetch(`${ ENDPOINTS.sales }-resume`).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default SalesApi;  