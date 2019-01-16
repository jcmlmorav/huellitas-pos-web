import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CurrencyFormat from '../../utils/CurrencyFormat';
import { addBilling } from '../../actions/billing';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

class CheckoutBilling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMoney: null,
      currentChange: null,
      isOpen: false
    };

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators(addBilling, dispatch);
  }

  static getDerivedStateFromProps(props, state) {
    const { isOpen } = props;

    state.isOpen = isOpen;

    return state;
  }

  toggle = () => {
    const { toggle } = this.props;

    this.setState({
      currentMoney: null,
      currentChange: null
    });

    toggle();
  }

  handleMoneyChange = event => {
    const { billing } = this.props;
    const value = event.target.value;

    this.setState({
      currentChange: (value - billing.total).toFixed(2),
      currentMoney: value
    });
  }

  handleSubmit = () => {
    const { billing, dispatch } = this.props;
    const { currentMoney, currentChange } = this.state;

    dispatch(addBilling(billing, currentMoney, currentChange));
    this.props.toggle();
  }

  render() {
    const { billing } = this.props;
    const { currentChange, currentMoney, isOpen } = this.state;
    const checkoutDisabled = parseInt(currentMoney) >= parseInt(billing.total);

    return (
      <Modal isOpen={ isOpen }>
        <ModalHeader>Finalizar compra</ModalHeader>
        <ModalBody>
          <Form>
            {/* <FormGroup>
              <Label for="customer">Asignar cliente</Label>
              <Input id="customer" name="customer" type="text" tabIndex="1" />
            </FormGroup>
            <Card>
              <CardHeader>Cliente</CardHeader>
              <CardBody>
                Yolima<br />
                1038769396<br />
                3013749459<br />
                yolima@gmail.com
              </CardBody>
            </Card>
            <hr /> */}
            <Card>
              <CardHeader>Pago: <strong>{ CurrencyFormat(billing.total) }</strong></CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for="money">Efectivo</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input id="money" name="money" onChange={ this.handleMoneyChange } type="number" step="500" tabIndex="2" value={ currentMoney } />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="change">Cambio</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input disabled id="change" name="change" type="number" step="500" tabIndex="-1" value={ currentChange } />
                  </InputGroup>
                </FormGroup>
              </CardBody>
            </Card>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={ this.toggle } outline tabIndex="-1">Volver</Button>
          <Button color="primary" onClick={ this.handleSubmit } disabled={ !checkoutDisabled } tabIndex="-1">Finalizar</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  billing: state.billings.billing
});

export default connect(mapStateToProps)(CheckoutBilling);
