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
                  <th scope="row"><strong>Subtotal</strong></th>
                  <td>{ CurrencyFormat(billing.subtotal) }</td>
                </tr>
                <tr>
                  <th scope="row"><strong>IVA</strong></th>
                  <td>{ CurrencyFormat(billing.iva) }</td>
                </tr>
                <tr>
                  <th scope="row"><strong>Total</strong></th>
                  <td>{ CurrencyFormat(billing.total) }</td>
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
