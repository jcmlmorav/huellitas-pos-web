import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'reactstrap';
import { getBillings } from '../../actions/billing';
import CurrencyFormat from '../../utils/CurrencyFormat';

class Billings extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators(getBillings, dispatch);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getBillings());
  }

  render() {
    const { billings } = this.props;

    return (
      <div>
        <h1 className="text-center">Facturas</h1>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Valor</th>
              <th>Cantidad de productos</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            { billings.map(sale => (
              <tr>
                <td><a href="javascript:;">Ver detalles</a></td>
                <td>{ CurrencyFormat(sale.total) }</td>
                <td>{ sale.products_quantity }</td>
                <td>{ sale.created_at }</td>
              </tr>
            )) }
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({ billings: state.billings.billings });

export default connect(mapStateToProps)(Billings);
