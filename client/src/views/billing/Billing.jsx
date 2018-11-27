import React, { Component } from 'react';
import { BillingProducts, BillingStatus, CheckoutBilling, SearchProduct } from '../../components';
import { Button, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { getBilling } from '../../actions/billing';
import './styles.scss';

class Billing extends Component {
  constructor() {
    super();

    this.state = { checkoutBillingIsOpen: false };
  }

  componentDidMount() {
    this.props.getBilling();
  }

  toggleCheckoutBilling = () => {
    this.setState(prevState => ({ checkoutBillingIsOpen: !prevState.checkoutBillingIsOpen }));
  }

  render() {
    const { checkoutBillingIsOpen } = this.state;
    const { billing } = this.props;

    return (
      <div>
        <h1 className="text-center">Facturación</h1>
        <SearchProduct titleText="Agregar producto" mode="billing" />
        <Row>
          <Col lg="9">
            <BillingProducts products={ billing.products } />
          </Col>
          <Col lg="3">
            <div className="stickyElement">
              <BillingStatus billing={ billing } />
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

const mapStateToprops = state => ({
  billing: state.billings.billing
});

const mapDispatchToProps = dispatch => ({
  getBilling: billing => dispatch(getBilling(billing))
});

export default connect(mapStateToprops, mapDispatchToProps)(Billing);
