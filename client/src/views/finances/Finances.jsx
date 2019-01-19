import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Button, Card, CardBody, CardFooter, CardTitle, Col, Table, Row } from 'reactstrap';
import { getIncomes, getExpenses, getIncomesResume, getExpensesResume } from '../../actions/finances';
import CurrencyFormat from '../../utils/CurrencyFormat';

class Finances extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators({
      getIncomes: dispatch,
      getExpenses: dispatch,
      getIncomesResume: dispatch,
      getExpensesResume: dispatch
    });
  }

  componentDidMount() {
    let { dispatch } = this.props;

    dispatch(getIncomes());
    dispatch(getExpenses());
    dispatch(getIncomesResume());
    dispatch(getExpensesResume());
  }

  render() {
    const { incomes, incomesResume, expenses, expensesResume } = this.props;

    return (
      <div>
        <h1 className="text-center">Finanzas</h1>
        <Row>
          <Col lg="4">
            <Card>
              <CardBody>
                <CardTitle>Ingresos</CardTitle>
                { CurrencyFormat(incomesResume.toFixed(2)) }
                <CardFooter className="text-center">
                  <Button color="primary" outline>Registrar ingreso</Button>
                </CardFooter>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card>
              <CardBody className="text-center">
                <CardTitle>Disponible</CardTitle>
                <strong>{ CurrencyFormat(incomesResume.toFixed(2) - expensesResume.toFixed(2)) }</strong>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card lg="6">
              <CardBody>
                <CardTitle>Egresos</CardTitle>
                { CurrencyFormat(expensesResume.toFixed(2)) }
                <CardFooter className="text-center">
                  <Button color="primary" outline>Registrar egreso</Button>
                </CardFooter>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="6">
            <Table>
              <thead>
                <tr>
                  <th>Ingreso</th>
                  <th>Valor</th>
                  <th>Fecha</th>
                </tr>
                { incomes.map(income => (
                  <tr>
                    <td>{ income.description }</td>
                    <td className="text-right">{ CurrencyFormat(income.income_value.toFixed(2)) }</td>
                    <td>{ income.created_at }</td>
                  </tr>
                ))}
              </thead>
            </Table>
            {( incomes.length === 0) && (
              <Alert className="text-center" color="primary">
                Aún no hay registros disponibles
              </Alert>
            )}
          </Col>
          <Col lg="6">
          <Table>
              <thead>
                <tr>
                  <th>Egreso</th>
                  <th>Valor</th>
                  <th>Fecha</th>
                </tr>
                { expenses.map(expense => (
                  <tr>
                    <td>{ expense.description }</td>
                    <td className="text-right">{ CurrencyFormat(expense.expense_value.toFixed(2)) }</td>
                    <td>{ expense.created_at }</td>
                  </tr>
                ))}
              </thead>
            </Table>
            {( expenses.length === 0) && (
              <Alert className="text-center" color="primary">
                Aún no hay registros disponibles
              </Alert>
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  incomes: state.finances.incomes,
  incomesResume: state.finances.incomesResume,
  expenses: state.finances.expenses,
  expensesResume: state.finances.expensesResume
});

export default connect(mapStateToProps)(Finances);
