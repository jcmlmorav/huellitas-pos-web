import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct, updateProduct } from '../../actions/inventory';
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
      isOpen: true,
      description: '',
      price: 0,
      quantity: 0
    };
  }

  componentDidMount() {
    document.getElementById('description').focus();

    const { product } = this.props;

    if(product !== undefined) {
      this.setState({
        description: product.description,
        price: product.price,
        quantity: product.quantity
      });
    }
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { description, price, quantity } = this.state;
    const { barcode, product } = this.props;

    const productObj = {
      barcode,
      description,
      price,
      quantity
    }

    if(product.barcode === barcode) {
      this.props.updateProduct(productObj);
    } else {
      this.props.addProduct(productObj);
    }

    this.props.onSubmit();
  }

  render() {
    const { barcode } = this.props;
    const { description, price, quantity } = this.state;

    return (
      <Modal isOpen={ this.state.isOpen }>
        <ModalHeader>Información de producto</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="barcode">Código</Label>
              <Input disabled id="barcode" onChange={ () => {} } name="barcode" type="text" value={ barcode } />
            </FormGroup>
            <FormGroup>
              <Label for="description">Descripción</Label>
              <Input id="description" maxLength="40" name="description" onChange={ this.handleInputChange } type="text" tabIndex="1" value={ description } />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Cantidad</Label>
              <Input id="quantity" name="quantity" onChange={ this.handleInputChange } type="number" step="1" tabIndex="2" value={ quantity } />
            </FormGroup>
            <FormGroup>
              <Label for="price">Precio</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input id="price" name="price" onChange={ this.handleInputChange } type="number" step="500" tabIndex="3" value={ price } />
              </InputGroup>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={ this.props.toggle } outline tabIndex="-1">Cancelar</Button>
          <Button color="primary" tabIndex="4" onClick={ this.handleSubmit } type="submit">Guardar</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

const mapStateToprops = (state, ownProps) => ({
  barcode: ownProps.barcode,
  product: ownProps.product
});

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProduct(product)),
  updateProduct: product => dispatch(updateProduct(product))
});

export default connect(mapStateToprops, mapDispatchToProps)(ProductInfo);
