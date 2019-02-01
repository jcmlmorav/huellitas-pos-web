import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'reactstrap';
import CurrencyFormat from '../../utils/CurrencyFormat';
import './styles.scss';
import { getLastBilling } from '../../actions/billing';
import Logo from '../../assets/colmillitos-pos.jpg';

class Sale extends Component {
  constructor(props) {
    super(props);

    this.state = { data: {} }

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators(getLastBilling, dispatch);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getLastBilling());
  }

  print() {
    window.print();
  }

  render() {
    const { lastBilling } = this.props;
    let discount = 0,
        subtotal = 0;

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
        <button className="printBtn hide" onClick={this.print}>Imprimir</button>
        <div class="printing">
        <img className="logo" src={Logo} alt="Logo Colmillitos" />
        <h5>TIENDA PARA MASCOTAS</h5>
        <h6>RÉGIMEN COMÚN</h6>
        <h6>NIT. 1038770891-8</h6>
        <h6>CARRERA 55A # 57A - 46</h6>
        <h6>TELÉFONO: 3136398031</h6>
        <h6>ITAGUÍ</h6>
        <br />
        <h6>FECHA: { lastBilling.created_at }</h6>
        <hr />
        <table>
          <tr>
            <th>&nbsp;</th>
            <th>DESCRIPCIÓN</th>
            <th className="priceHead">VALOR</th>
          </tr>
          { lastBilling.products.map(product => {
            discount = discount + (((product.pivot.discount / 100) * product.pivot.price) * product.pivot.quantity);
            subtotal = subtotal + (product.pivot.price * product.pivot.quantity);

            return (
              <tr key={ product.id }>
                <td>{ product.pivot.quantity }x&nbsp;</td>
                <td className="mayus">
                  { product.description }
                  { product.pivot.discount > 0 && 
                    <>
                      <br /><small>AHORRO: { CurrencyFormat((((product.pivot.discount / 100) * product.pivot.price) * product.pivot.quantity).toFixed(2)) }</small>
                    </>
                  }
                </td>
                <td className="priceColumn">
                  { product.pivot.discount > 0 ? CurrencyFormat((((1 - (product.pivot.discount / 100)) * product.pivot.price) * product.pivot.quantity).toFixed(2)) : CurrencyFormat((product.pivot.price * product.pivot.quantity).toFixed(2)) }
                </td>
              </tr>
            )
          }) }
        </table>
        <hr/>
        { discount > 0 && (
          <>
            <h6>SUBTOTAL: { CurrencyFormat(subtotal.toFixed(2)) }</h6>
            <h6>AHORRO: { CurrencyFormat(discount.toFixed(2)) }</h6>
            <br />
          </>
        )}
        <h4>TOTAL: { CurrencyFormat(lastBilling.total) }</h4>
        <hr/>
        <table>
          <tr>
            <td>EFECTIVO:</td>
            <td>{ CurrencyFormat(lastBilling.money) }</td>
          </tr>
          <tr>
            <td>CAMBIO:</td>
            <td>{ CurrencyFormat(lastBilling.change) }</td>
          </tr>
        </table>
        <br /><br />
        <h6>GRACIAS POR SU COMPRA</h6>
        <h6><strong>VISITANOS EN WWW.COLMILLITOS.PET</strong></h6>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lastBilling: state.billings.lastBilling
});

export default connect(mapStateToProps)(Sale);
