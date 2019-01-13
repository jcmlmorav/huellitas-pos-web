import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'reactstrap';
import CurrencyFormat from '../../utils/CurrencyFormat';
import './styles.scss';
import { getLastBilling } from '../../actions/billing';

class Sale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators(getLastBilling, dispatch);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getLastBilling());
  }

  render() {
    const { lastBilling } = this.props;

    if( Object.keys(lastBilling).length === 0 ) {
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
        <h5>Tienda para mascotas</h5>
        <h3>COLMILLITOS</h3>
        <h5>www.colmillitos.pet</h5>
        <h6>NIT. 1038770891-8</h6>
        <h6>Carrera 55A # 57A - 46</h6>
        <h6>Teléfono: 3136398031</h6>
        <h6>Itaguí, Antioquia</h6>
        <hr />
        <h6>Fecha: { lastBilling.created_at }</h6>
        <hr />
        <table>
          <tr>
            <th>&nbsp;</th>
            <th>Descripción</th>
            <th>Valor</th>
          </tr>
          { lastBilling.products.map(product => (
                <tr>
                  <td>{ product.pivot.quantity }x&nbsp;</td>
                  <td>
                    { product.description }
                    { product.pivot.discount > 0 && 
                      <>
                        &nbsp;<sup>{product.pivot.discount }%</sup>
                      </>
                    }
                  </td>
                  <td>
                    { product.pivot.discount > 0 ? CurrencyFormat(((1 - (product.pivot.discount / 100)) * product.pivot.price) * product.pivot.quantity) : CurrencyFormat(product.pivot.price * product.pivot.quantity) }
                  </td>
                </tr>
              )) }
        </table>
        <hr/>
        <h4>TOTAL: { CurrencyFormat(lastBilling.total) }</h4>
        <hr/>
        <table>
          <tr>
            <td>Efectivo:</td>
            <td>$10.000</td>
          </tr>
          <tr>
            <td>Cambio:</td>
            <td>$1.000</td>
          </tr>
        </table>
        <br /><br />
        <h6>GRACIAS POR SU COMPRA</h6>
        <h6>Visitanos en www.colmillitos.pet</h6>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lastBilling: state.billings.lastBilling
});

export default connect(mapStateToProps)(Sale);
