import React, { Component } from 'react';
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

    this.state = { isOpen: false };
  }

  static getDerivedStateFromProps(props, state) {
    const { isOpen } = props;

    state.isOpen = isOpen;

    return state;
  }

  render() {
    const { toggle } = this.props;
    const { isOpen } = this.state;

    return (
      <Modal isOpen={ isOpen }>
        <ModalHeader>Finalizar compra</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
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
            <hr />
            <Card>
              <CardHeader>Pago</CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for="money">Efectivo</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input id="money" name="money" type="number" step="500" tabIndex="2" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="change">Cambio</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input disabled id="change" name="change" type="number" step="500" tabIndex="-1" />
                  </InputGroup>
                </FormGroup>
              </CardBody>
            </Card>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={ toggle } outline tabIndex="-1">Volver</Button>
          <Button color="primary" tabIndex="-1">Finalizar</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default CheckoutBilling;
