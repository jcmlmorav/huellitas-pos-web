import React, { Component } from 'react';
import { Alert, Col, Table, Row } from 'reactstrap';
import CurrencyFormat from '../../utils/CurrencyFormat';

class BillingProducts extends Component {
  constructor(props) {
    super(props);

    this.state = { products: [] };
  }

  static getDerivedStateFromProps(props, state) {
    const { products } = props;

    return {
      ...state,
      products
    }
  }

  render() {
    let component = null;
    const { products } = this.state;

    if( products && products.length ) {
      component = (
        <Row>
          <Col>
            <Table bordered>
              <thead>
                <tr>
                  <th>Código de barras</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Precio total</th>
                </tr>
              </thead>
              <tbody>
                { products.map((product, index) => (
                  <tr key={ index }>
                    <th scope="row">{ product.barcode }</th>
                    <td>{ product.description }</td>
                    <td>{ product.quantity }</td>
                    <td>{ CurrencyFormat(product.price) }</td>
                    <td>{ CurrencyFormat(product.quantity * product.price) }</td>
                  </tr>
                )) }
              </tbody>
            </Table>
          </Col>
        </Row>
      )
    } else {
      component = (
        <Alert color="primary">
          No se han registrado productos para esta compra. <br />
          Para agregar un producto escanee el código de barras o ingrese el código en el campo buscar.
        </Alert>
      );
    }

    return (
      <div>
        { component }
      </div>
    )
  }
}

export default BillingProducts;
