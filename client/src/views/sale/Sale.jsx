import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Table } from 'reactstrap';
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
        <h3>COLMILLITOS</h3>
        <h4>colmillitos.pet</h4>
        <h6>Carrera 55A # 57A - 46</h6>
        <h6>Itaguí</h6>
        <hr />
        <h6>Fecha: { lastBilling.created_at }</h6>
        <table>
          <tr>
            <th>Cant.</th>
            <th>Producto</th>
            <th>Total</th>
          </tr>
          { lastBilling.products.map(product => (
                <tr>
                  <td>{ product.quantity }</td>
                  <td>
                    { product.description }
                    { product.discount > 0 && 
                      <>
                        &nbsp;<sup>{product.discount }%</sup>
                      </>
                    }
                  </td>
                  <td>
                    { product.discount > 0 ? CurrencyFormat(((1 - (product.discount / 100)) * product.price) * product.quantity) : CurrencyFormat(product.price * product.quantity) }
                  </td>
                </tr>
              )) }
        </table>
        <hr/>
        <p>Total: { CurrencyFormat(lastBilling.total) }</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lastBilling: state.billings.lastBilling
});

export default connect(mapStateToProps)(Sale);
