import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

class BillingStatus extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>Balance actual</CardTitle>
            <Table>
              <tbody>
                <tr>
                  <th scope="row"><strong>Subtotal</strong></th>
                  <td>$ 100.000</td>
                </tr>
                <tr>
                  <th scope="row"><strong>IVA</strong></th>
                  <td>$ 19.000</td>
                </tr>
                <tr>
                  <th scope="row"><strong>Total</strong></th>
                  <td>$ 119.000</td>
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
