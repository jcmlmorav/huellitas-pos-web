import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProduct, cleanSelectedProduct, cleanSelectedProducts } from '../../actions/inventory';
import { addProductToBilling } from '../../actions/billing';
import { ProductInfo, ProductsSelector } from '../../components';
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';

class SearchProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      productInfoIsOpen: false,
      productSelectorIsOpen: false,
      barcode: null,
      initialized: false
    };

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators({
      getProduct: dispatch,
      addProductToBilling: dispatch,
      cleanSelectedProduct: dispatch,
      cleanSelectedProducts: dispatch
    });
  }
  
  componentDidMount() {
    document.getElementById('searchProduct').focus();
    this.setState({ initialized: true });
    this.initialized = true;
  }

  static getDerivedStateFromProps(props, state) {
    if(state.initialized) {
      let derivedState = { ...state };

      if(props.selectedProducts.length === 0 && Object.keys(props.selectedProduct).length) {
        derivedState.productSelectorIsOpen = false;
        if(props.mode === 'billing') {
          derivedState.productInfoIsOpen = false;
        } else {
          derivedState.productInfoIsOpen = true;
        }
      }

      if(props.selectedProducts.length && Object.keys(props.selectedProduct).length === 0) {
        derivedState.barcode = '';
        derivedState.productSelectorIsOpen = true;
        derivedState.productInfoIsOpen = false;
      }
      
      if(derivedState.productInfoIsOpen) {
        derivedState.productSelectorIsOpen = false;
      }

      if(derivedState.productSelectorIsOpen) {
        derivedState.productInfoIsOpen = false;
      }

      return derivedState;
    }

    return state;
  }

  handleProductValue = (e) => {
    if( !(e.target.value === '') ) {
      this.setState({ alert: null });
    }

    let { barcode } = this.state;
    
    barcode = e.target.value;

    this.setState({ barcode });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { barcode } = this.state;

    if( !barcode ) {
      let { alert } = this.state;

      alert = <Alert color='danger'>No se ha escrito nada en el campo de búsqueda de productos</Alert>;

      this.setState({ alert });
    } else {
      const { dispatch, mode } = this.props;

      this.setState({ alert: null });
      dispatch(getProduct(barcode));

      if( mode === 'inventory' ) {
        this.setState({ productInfoIsOpen: true, productSelectorIsOpen: true });
      }

      if( mode === 'billing' ) {
        const { products } = this.props;

        let productExists = products.find(product => product.barcode === barcode);
  
        if( productExists ) {
          dispatch(addProductToBilling(productExists));
          this.setState({ barcode: '' });
        } else {
          this.setState({ productInfoIsOpen: true });
        }
      }
    }
  }

  cleanproductSelected = () => {
    const { dispatch }  = this.props;

    dispatch(cleanSelectedProduct());
  }

  toggleProductInfo = () => {
    this.setState(prevState => ({ productInfoIsOpen: !prevState.productInfoIsOpen }));
    this.cleanproductSelected();
  }

  toggleProductsSelector = () => {
    this.setState(prevState => ({ productSelectorIsOpen: !prevState.productSelectorIsOpen }));
    const { dispatch } = this.props;
    dispatch(cleanSelectedProducts());
  }

  handleProductSelected = (product) => {
    this.setState({
      selectedProduct: {...product},
      selectedProducts: []
    });
  }

  handleProductInfoSubmit = () => {
    this.setState({
      barcode: '',
      productInfoIsOpen: false
    });
    this.cleanproductSelected();
  }

  render() {
    const { mode, titleText, error, selectedProduct, selectedProducts } = this.props;
    const { alert, productInfoIsOpen, barcode, productSelectorIsOpen } = this.state;

    return (
      <Row>
        <Col lg={{ size: 6, order: 2, offset: 3 }}>
          { alert }
          <Form autoComplete="off" onSubmit={ this.handleSubmit }>
            <FormGroup>
              <Label for="searchProduct">{ titleText }</Label>
              <Row>
                <Col lg="10">
                  <Input id="searchProduct" name="searchProduct" onChange={ this.handleProductValue } type="text" tabIndex="1" value={ barcode } />
                </Col>
                <Col lg="2">
                  <Button color="primary" tabIndex="-1">Buscar</Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>

          <ProductInfo
            isOpen={productInfoIsOpen}
            toggle={ this.toggleProductInfo }
            barcode={ barcode || selectedProduct.barcode }
            onSubmit={ this.handleProductInfoSubmit }
            product={ selectedProduct }
            mode={ mode }
            error={ error }
          />
          
          <ProductsSelector
            mode={ mode }
            isOpen={productSelectorIsOpen}
            products={ selectedProducts }
            onClose={ this.toggleProductsSelector }
            handleProductSelected={ this.handleProductSelected }
          />
        </Col>
      </Row>
    )
  }
}

const mapStateToprops = state => ({
  selectedProduct: state.inventory.selectedProduct,
  selectedProducts: state.inventory.selectedProducts,
  products: state.inventory.products,
  error: state.inventory.error
});

export default connect(mapStateToprops)(SearchProduct);
