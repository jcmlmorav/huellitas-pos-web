import React, { Component } from 'react';
import { TitleStyled } from '../../styles';
import { WrapperStyled, ContentStyled, SidebarStyled } from './styles';
import Checkout from './components/checkout';
import { BillingProducts, CheckoutBilling, SearchProduct } from '../../components';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProducts } from '../../actions/inventory';
import { getBilling, cleanBilling } from '../../actions/billing';
import './styles.scss';

class Billing extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.state = { checkoutBillingIsOpen: false };

    this.boundActionCreators = bindActionCreators({
      getBilling: dispatch,
      getProducts: dispatch,
      cleanBilling: dispatch
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

  handleCancelBilling = () => {
    let { dispatch } = this.props;

    dispatch(cleanBilling());
  }

  render() {
    const { checkoutBillingIsOpen } = this.state;
    const { billing } = this.props;
    const billingDisabled = billing.products.length > 0;

    return (
      <>
        <TitleStyled>Facturación</TitleStyled>
        <WrapperStyled>
          <ContentStyled>
            <SearchProduct titleText="Agregar producto" mode="billing" />
            <BillingProducts />
          </ContentStyled>
          <SidebarStyled>
            <Checkout billing={billing} handleCancel={this.handleCancelBilling} />
            <div className="billingButtons">
              <Button block color="primary" disabled={!billingDisabled} onClick={this.toggleCheckoutBilling} tabIndex="-1">Finalizar compra</Button>
            </div>
          </SidebarStyled>
        </WrapperStyled>
        <CheckoutBilling isOpen={checkoutBillingIsOpen} toggle={this.toggleCheckoutBilling} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  billing: state.billings.billing
});

export default connect(mapStateToProps)(Billing);
