import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Button, Col, Table, Row } from 'reactstrap';
import CurrencyFormat from '../../utils/CurrencyFormat';
import { removeProductFromBilling } from '../../actions/billing';

class BillingProducts extends Component {
  constructor(props) {
    super(props);

    this.state = { products: [] };

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators(removeProductFromBilling, dispatch);
  }

  static getDerivedStateFromProps(props, state) {
    const { products } = props;

    return {
      ...state,
      products
    }
  }

  removeProduct(product) {
    const{ dispatch } = this.props;
    dispatch(removeProductFromBilling(product));
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { products.map((product, index) => (
                  <tr key={ index }>
                    <th scope="row">{ product.barcode }</th>
                    <td>
                      { product.description }
                      { product.discount > 0 &&
                        <div>
                          <small>Descuento: { product.discount }%</small>
                        </div>
                      }
                    </td>
                    <td>{ product.quantity }</td>
                    <td>
                      { product.discount > 0 ?
                        (<div>
                          <small><strike>{ CurrencyFormat(product.price) }</strike></small>
                          <br />
                          { CurrencyFormat((product.price * ((100 - product.discount) / 100)).toFixed(2)) }
                        </div>) :
                        (CurrencyFormat(product.price))
                      }
                    </td>
                    <td>
                      { product.discount > 0 ?
                        (<div>
                          <small><strike>{ CurrencyFormat(product.quantity * product.price) }</strike></small>
                          <br />
                          { CurrencyFormat(((product.quantity * product.price) * ((100 - product.discount) / 100)).toFixed(2)) }
                        </div>) :
                        (CurrencyFormat(product.quantity * product.price))
                      }
                    </td>
                    <td><Button outline onClick={ () => this.removeProduct(product) } color="danger">Eliminar</Button></td>
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

const mapStateToProps = state => ({
  products: state.billings.billing.products
});

export default connect(mapStateToProps)(BillingProducts);
