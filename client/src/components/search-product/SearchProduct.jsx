import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../../actions/inventory';
import { ProductInfo } from '../../components';
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
      barcode: ''
    };
  }
  
  componentDidMount() {
    document.getElementById('searchProduct').focus();
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
      const { mode } = this.props;

      this.setState({ alert: null });
      
      this.props.getProduct(barcode);

      if( mode === 'inventory' ) {
        this.setState({ productInfoIsOpen: true });
      }
    }
  }

  toggleProductInfo = () => {
    this.setState(prevState => ({ productInfoIsOpen: !prevState.productInfoIsOpen }));
  }

  handleProductInfoSubmit = () => {
    this.toggleProductInfo();
    this.setState({ barcode: '' });
  }

  render() {
    const { titleText, product } = this.props;
    const { alert, productInfoIsOpen, barcode } = this.state;

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
          { productInfoIsOpen &&
            <ProductInfo toggle={ this.toggleProductInfo } barcode={ barcode } onSubmit={ this.handleProductInfoSubmit } product={ product } />
          }
        </Col>
      </Row>
    )
  }
}

const mapStateToprops = state => ({
  product: state.inventory.product
});

const mapDispatchToProps = dispatch => ({
  getProduct: barcode => dispatch(getProduct(barcode))
});

export default connect(mapStateToprops, mapDispatchToProps)(SearchProduct);
