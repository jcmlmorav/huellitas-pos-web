import React, { Component } from 'react';
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
      product: {
        barcode: '',
        description: '',
        price: 0,
        quantity: 0
      }
    };
  }
  
  componentDidMount() {
    document.getElementById('searchProduct').focus();
  }

  handleProductValue = (e) => {
    if( !(e.target.value === '') ) {
      this.setState({ alert: null });
    }

    const { product } = this.state;
    
    product.barcode = e.target.value;

    this.setState({ product });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { product } = this.state;

    if( !product.barcode ) {
      let { alert } = this.state;

      alert = <Alert color='danger'>No se ha escrito nada en el campo de búsqueda de productos</Alert>;

      this.setState({ alert });
    } else {
      const { mode } = this.props;

      this.setState({ alert: null });

      if( mode === 'inventory' ) {
        this.setState({ productInfoIsOpen: true });
      }
    }
  }

  toggleProductInfo = () => {
    this.setState(prevState => ({ productInfoIsOpen: !prevState.productInfoIsOpen }));
  }

  render() {
    const { titleText } = this.props;
    const { alert, productInfoIsOpen, product } = this.state;

    return (
      <Row>
        <Col lg={{ size: 6, order: 2, offset: 3 }}>
          { alert }
          <Form autoComplete="off" onSubmit={ this.handleSubmit }>
            <FormGroup>
              <Label for="searchProduct">{ titleText }</Label>
              <Row>
                <Col lg="10">
                  <Input id="searchProduct" name="searchProduct" onChange={ this.handleProductValue } type="text" tabIndex="1" value={ product.barcode } />
                </Col>
                <Col lg="2">
                  <Button color="primary">Buscar</Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>
          <ProductInfo isOpen={ productInfoIsOpen } toggle={ this.toggleProductInfo } barcode={ product.barcode } />
        </Col>
      </Row>
    )
  }
}

export default SearchProduct;
