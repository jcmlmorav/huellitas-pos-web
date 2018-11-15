import React, { Component } from 'react';
import {
  Button,
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

class ProductInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barcode: '',
      description: '',
      isOpen: false,
      price: 0,
      quantity: 0
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { isOpen } = props;

    state.isOpen = isOpen;

    return state;
  }

  handleDescription = (e) => {
    this.setState({ description: e.target.value });
  }

  handlePrice = (e) => {
    this.setState({ price: e.target.value });
  }

  handleQuantity = (e) => {
    this.setState({ quantity: e.target.value });
  }

  handleCancel = () => {
    const { toggle } = this.props;

    this.setState({
      barcode: '',
      description: '',
      price: 0,
      quantity: 0
    });

    toggle();
  }

  render() {
    const { barcode } = this.props;
    const { description, quantity, price } = this.state;

    return (
      <Modal isOpen={this.state.isOpen}>
        <ModalHeader>Información de producto</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="barcode">Código</Label>
              <Input disabled id="barcode" onChange={() => {}} name="barcode" type="text" value={ barcode } />
            </FormGroup>
            <FormGroup>
              <Label for="description">Descripción</Label>
              <Input onChange={ this.handleDescription } id="description" maxLength="40" name="description" type="text" value={ description } />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Cantidad</Label>
              <Input onChange={ this.handleQuantity } id="quantity" name="quantity" type="number" step="1" value={ quantity } />
            </FormGroup>
            <FormGroup>
              <Label for="price">Precio</Label>
              <InputGroup>
              <InputGroupAddon addonType="prepend">$</InputGroupAddon>
              <Input onChange={ this.handlePrice } id="price" name="price" type="number" step="500" value={ price }/>
            </InputGroup>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={ this.handleCancel } outline>Cancelar</Button>
          <Button color="primary">Guardar</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ProductInfo;
