import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import CurrencyFormat from '../../utils/CurrencyFormat';

class BillingStatus extends Component {
  render() {
    const { billing } = this.props;

    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>Balance actual</CardTitle>
            <Table>
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td>{ CurrencyFormat(billing.brute) }</td>
                </tr>
                <tr>
                  <td>Descuento</td>
                  <td>-{ CurrencyFormat(billing.discount) }</td>
                </tr>
                <tr>
                  <th scope="row"><strong>Total</strong></th>
                  <th scope="row">{ CurrencyFormat(billing.total) }</th>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default BillingStatus;
