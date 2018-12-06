import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProduct, updateProduct } from '../../actions/inventory';
import { addProductToBilling } from '../../actions/billing';
import {
  Alert,
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress
} from 'reactstrap';

class ProductInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
      description: '',
      price: 0,
      quantity: 0,
      discount: 0
    };

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators({
      addProduct: dispatch,
      updateProduct: dispatch,
      addProductToBilling: dispatch
    });
  }

  componentDidMount() {
    document.getElementById('description').focus();

    const { product } = this.props;

    if(product !== undefined) {
      this.setState({
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        discount: product.discount
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if( Object.keys(props.createdProduct).length || Object.keys(props.updatedProduct).length ) {
      props.onSubmit();
    }

    return state;
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

    if(this.props.product) {
      const { description, price, quantity, discount } = this.state;
      const {
        barcode,
        mode,
        product,
        dispatch
      } = this.props;

      const productObj = {
        barcode,
        description,
        price,
        quantity,
        discount
      }

      if(product.barcode === barcode) {
        productObj.id = product.id;
        dispatch(updateProduct(productObj));
      } else {
        dispatch(addProduct(productObj));
        
        if( mode === 'billing' ) {
          dispatch(addProductToBilling(productObj));
        }
      }
    }
  }

  render() {
    const { barcode, error, product } = this.props;
    const { description, price, quantity, discount } = this.state;

    let generalError = '',
        barcodeError = '',
        descriptionError = '',
        quantityError = '',
        priceError = '',
        discountError = '';

    if( error && Object.keys(error).length ) {
      if( 'failed' in error ) {
        generalError = (<Alert color="danger">{ error.failed }</Alert>);
      }
      if( 'barcode' in error ) {
        barcodeError = (<FormFeedback>{ error.barcode[0] }</FormFeedback>);
      }
      if( 'description' in error ) {
        descriptionError = (<FormFeedback>{ error.description }</FormFeedback>);
      }
      if( 'quantity' in error ) {
        quantityError = (<FormFeedback>{ error.quantity }</FormFeedback>);
      }
      if( 'price' in error ) {
        priceError = (<FormFeedback>{ error.price }</FormFeedback>);
      }
      if( 'discount' in error ) {
        discountError = (<FormFeedback>{ error.discount }</FormFeedback>);
      }
    }

    return (
      <Modal isOpen={ this.state.isOpen }>
        <ModalHeader>Información de producto</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="barcode">Código</Label>
              <Input disabled id="barcode" onChange={ () => {} } name="barcode" type="text" value={ barcode } invalid={ !(barcodeError === '') } />
              { barcodeError }
            </FormGroup>
            <FormGroup>
              <Label for="description">Descripción</Label>
              <Input id="description" maxLength="40" name="description" onChange={ this.handleInputChange } type="text" tabIndex="1" value={ description } invalid={ !(descriptionError === '') } />
              { descriptionError }
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Cantidad</Label>
              <Input id="quantity" name="quantity" onChange={ this.handleInputChange } type="number" step="1" tabIndex="2" value={ quantity } invalid={ !(quantityError === '') } />
              { quantityError }
            </FormGroup>
            <FormGroup>
              <Label for="price">Precio</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input id="price" name="price" onChange={ this.handleInputChange } type="number" step="500" tabIndex="3" value={ price } invalid={ !(priceError === '') } />
                { priceError }
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="discount">Descuento</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">%</InputGroupAddon>
                <Input id="discount" name="discount" onChange={ this.handleInputChange } type="number" step="1" tabIndex="4" value={ discount } invalid={ !(discountError === '') } />
                { discountError }
              </InputGroup>
            </FormGroup>
          </Form>
          { generalError }
          {(!(product) && !('failed' in error)) &&
            <Progress animated value={100} />
          }
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
  product: ownProps.product,
  createdProduct: state.inventory.createdProduct,
  updatedProduct: state.inventory.updatedProduct
});

export default connect(mapStateToprops)(ProductInfo);
