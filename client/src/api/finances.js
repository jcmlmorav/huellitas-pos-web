import ENDPOINTS from '../constants/endpoints';
import fetch from 'cross-fetch';

class FinancesApi {
  static getIncomes() {
    return fetch(ENDPOINTS.incomes).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getIncomesResume() {
    return fetch(`${ENDPOINTS.incomes}-resume`).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getExpenses() {
    return fetch(ENDPOINTS.expenses).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getExpensesResume() {
    return fetch(`${ENDPOINTS.expenses}-resume`).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static addIncome(income) {
    return fetch(
      ENDPOINTS.incomes,
      {
        method: 'POST',
        body: JSON.stringify(income),
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

  static addExpense(expense) {
    return fetch(
      ENDPOINTS.expenses,
      {
        method: 'POST',
        body: JSON.stringify(expense),
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

export default FinancesApi;  
