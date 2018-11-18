import React, { Component } from 'react';
import { BillingProducts, BillingStatus, CheckoutBilling, SearchProduct } from '../../components';
import { Button, Col, Row } from 'reactstrap';
import './styles.scss';

class Billing extends Component {
  constructor() {
    super();

    this.state = { checkoutBillingIsOpen: false }
  }

  toggleCheckoutBilling = () => {
    this.setState(prevState => ({ checkoutBillingIsOpen: !prevState.checkoutBillingIsOpen }));
  }

  render() {
    const { checkoutBillingIsOpen } = this.state;

    return (
      <div>
        <h1 className="text-center">Facturación</h1>
        <SearchProduct titleText="Agregar producto" mode="billing" />
        <Row>
          <Col lg="9">
            <BillingProducts />
          </Col>
          <Col lg="3">
            <div className="stickyElement">
              <BillingStatus />
              <div className="billingButtons">
                <Button block color="primary" onClick={ this.toggleCheckoutBilling } tabIndex="-1">Finalizar compra</Button>
                <Button block color="secondary" outline tabIndex="-1">Cancelar compra</Button>
              </div>
            </div>
          </Col>
        </Row>
        <CheckoutBilling isOpen={ checkoutBillingIsOpen } toggle={ this.toggleCheckoutBilling } />
      </div>
    )
  }
}

export default Billing;
