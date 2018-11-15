import React, { Component } from 'react';
import { BillingProducts, BillingStatus, SearchProduct } from '../../components';
import { Button, Col, Row } from 'reactstrap';

class Billing extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Facturación</h1>
        <SearchProduct titleText="Agregar producto" mode="billing" />
        <Row>
          <Col lg="9">
            <BillingProducts />
          </Col>
          <Col lg="3">
            <BillingStatus />
            <hr />
            <Button color="primary">Finalizar compra</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Billing;
