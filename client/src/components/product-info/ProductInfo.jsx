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
      isOpen: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { isOpen } = props;

    state.isOpen = isOpen;

    return state;
  }

  handleCancel = () => {
    const { toggle } = this.props;

    this.setState({
      barcode: ''
    });

    toggle();
  }

  render() {
    const { barcode } = this.props;

    return (
      <Modal isOpen={this.state.isOpen}>
        <ModalHeader>Información de producto</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="barcode">Código</Label>
              <Input disabled id="barcode" name="barcode" type="text" value={ barcode } />
            </FormGroup>
            <FormGroup>
              <Label for="description">Descripción</Label>
              <Input id="description" maxLength="40" name="description" type="text" />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Cantidad</Label>
              <Input id="quantity" name="quantity" type="number" step="1" />
            </FormGroup>
            <FormGroup>
              <Label for="price">Precio</Label>
              <InputGroup>
              <InputGroupAddon addonType="prepend">$</InputGroupAddon>
              <Input id="price" name="price" type="number" step="500" />
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
