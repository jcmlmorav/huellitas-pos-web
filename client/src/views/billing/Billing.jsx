import React, { Component } from 'react';
import { BillingProducts, BillingStatus, CheckoutBilling, SearchProduct } from '../../components';
import { Button, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProducts } from '../../actions/inventory';
import { getBilling } from '../../actions/billing';
import './styles.scss';

class Billing extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.state = { checkoutBillingIsOpen: false };

    this.boundActionCreators = bindActionCreators({
      getBilling: dispatch,
      getProducts: dispatch
    });
  }

  componentDidMount() {
    let { dispatch } = this.props;

    dispatch(getProducts());
    dispatch(getBilling());
  }

  toggleCheckoutBilling = () => {
    this.setState(prevState => ({ checkoutBillingIsOpen: !prevState.checkoutBillingIsOpen }));
  }

  render() {
    const { checkoutBillingIsOpen } = this.state;
    const { billing } = this.props;
    const billingDisabled = billing.products.length > 0;

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
                <Button block color="primary" disabled={ !billingDisabled } onClick={ this.toggleCheckoutBilling } tabIndex="-1">Finalizar compra</Button>
                <Button block color="secondary" disabled={ !billingDisabled } outline tabIndex="-1">Cancelar compra</Button>
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

export default connect(mapStateToprops)(Billing);
