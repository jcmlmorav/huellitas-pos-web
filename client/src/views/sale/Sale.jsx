import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Table } from 'reactstrap';
import CurrencyFormat from '../../utils/CurrencyFormat';
import './styles.scss';

class Sale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    const { createdBilling } = this.props;

    debugger;
  }

  render() {
    const { createdBilling } = this.props;

    if( Object.keys(createdBilling).length === 0 ) {
      return (
        <div>
          <h1 className="text-center">Compra</h1>
          <Alert color="primary">
            No hay última compra registrada
          </Alert>
        </div>
      );
    }

    return (
      <div>
        <h1 className="text-center hide">Compra</h1>
        <hr className="hide" />
        <p className="text-center">
          <h3>COLMILLITOS</h3>
          <h4>NIT 1038769396</h4>
          <h5>Carrera 55A # 57A - 46</h5>
          <h6>www.tiendacolmillitos.com</h6>
        </p>
        <p className="text-center">Fecha: { createdBilling.created_at }</p>
        <br />
        <Table size="sm">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              { createdBilling.products.map(product => (
                <tr>
                  <td>
                    { product.description }
                    { product.discount > 0 && 
                      <>
                        &nbsp;<sup>{product.discount }%</sup>
                      </>
                    }
                  </td>
                  <td>{ product.quantity }</td>
                  <td>
                    { product.discount > 0 ? CurrencyFormat((1 - (product.discount / 100)) * product.price) : CurrencyFormat(product.price) }
                  </td>
                  <td>
                    { product.discount > 0 ? CurrencyFormat(((1 - (product.discount / 100)) * product.price) * product.quantity) : CurrencyFormat(product.price * product.quantity) }
                  </td>
                </tr>
              )) }
            </tbody>
          </Table>
          <Table>
            <thead>
              <tr>
                <th>Total</th>
                <th>{ CurrencyFormat(createdBilling.total) }</th>
              </tr>
            </thead>
          </Table>
          <p><strong>NOTAS: </strong><sup>xx%</sup> Descuento aplicado al producto</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  createdBilling: state.billings.createdBilling
});

export default connect(mapStateToProps)(Sale);
