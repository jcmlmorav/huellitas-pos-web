import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Card, CardBody, CardTitle, Col, Table, Row } from 'reactstrap';
import { getAll, getResume } from '../../actions/sales';
import CurrencyFormat from '../../utils/CurrencyFormat';

class Box extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators({
      getAll: dispatch,
      getResume: dispatch,
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getAll());
    dispatch(getResume());
  }

  render() {
    const { salesResume, sales } = this.props;

    return (
      <div>
        <h1 className="text-center">Caja</h1>
        <hr />
        <Row>
          <Col lg={{ size: 4, offset: 4 }}>
            <Card>
              <CardBody className="text-center">
                <CardTitle>Flujo de caja</CardTitle>
                <span>{ CurrencyFormat(salesResume.toFixed(2)) }</span>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        { sales.length ? (
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Concepto</th>
                <th>Valor</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              { sales.map(sale => (
                <tr>
                  <td><a href="javascript:;">Ver detalles</a></td>
                  <td>{ sale.description }</td>
                  <td>{ CurrencyFormat(sale.income_value) }</td>
                  <td>{ sale.created_at }</td>
                </tr>
              )) }
            </tbody>
          </Table>
          ) : (<Alert color="primary">No se han realizado ventas el día de hoy</Alert>)
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sales: state.sales.sales,
  salesResume: state.sales.salesResume
});

export default connect(mapStateToProps)(Box);
