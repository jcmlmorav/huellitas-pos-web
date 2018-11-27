import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

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
                  <td>$ { billing.subtotal }</td>
                </tr>
                <tr>
                  <th scope="row"><strong>IVA</strong></th>
                  <td>$ { billing.iva }</td>
                </tr>
                <tr>
                  <th scope="row"><strong>Total</strong></th>
                  <td>$ { billing.total }</td>
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
