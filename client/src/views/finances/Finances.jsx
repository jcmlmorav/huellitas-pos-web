import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Button, Card, CardBody, CardFooter, CardTitle, Col, Table, Row } from 'reactstrap';
import { getIncomes, getExpenses, getIncomesResume, getExpensesResume, cleanCreatedExpense, cleanCreatedIncome } from '../../actions/finances';
import CurrencyFormat from '../../utils/CurrencyFormat';
import { IncomeForm, ExpenseForm } from '../../components';

class Finances extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incomeIsOpen: false,
      expenseIsOpen: false
    };

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators({
      getIncomes: dispatch,
      getExpenses: dispatch,
      getIncomesResume: dispatch,
      getExpensesResume: dispatch,
      cleanCreatedExpense: dispatch,
      cleanCreatedIncome: dispatch
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getIncomes());
    dispatch(getExpenses());
    dispatch(getIncomesResume());
    dispatch(getExpensesResume());
  }

  toggleIncomeForm = () => {
    const { dispatch } = this.props;

    dispatch(cleanCreatedIncome());
    this.setState(prevState => ({ incomeIsOpen: !prevState.incomeIsOpen }));
  }

  toggleExpenseForm = () => {
    const { dispatch } = this.props;

    dispatch(cleanCreatedExpense());
    this.setState(prevState => ({ expenseIsOpen: !prevState.expenseIsOpen }));
  }

  render() {
    const { incomesResume, expenses, expensesResume } = this.props;
    const { incomeIsOpen, expenseIsOpen } = this.state;

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
                  <Button color="primary" outline onClick={ this.toggleIncomeForm }>Registrar ingreso</Button>
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
                  <Button color="primary" outline onClick={ this.toggleExpenseForm }>Registrar egreso</Button>
                </CardFooter>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <IncomeForm isOpen={ incomeIsOpen } toggle={ this.toggleIncomeForm } />
        <ExpenseForm isOpen={ expenseIsOpen } toggle={ this.toggleExpenseForm } />
        <br />
        <Row>
          {/* <Col lg="12">
            <Table>
              <thead>
                <tr>
                  <th>Ingreso</th>
                  <th>Valor</th>
                  <th>Fecha</th>
                </tr>
                { incomes.map(income => (
                  <tr key={ income.id }>
                    <td>{ income.description }</td>
                    <td className="text-right">{ CurrencyFormat(income.income_value) }</td>
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
          </Col> */}
          <Col lg="12" className="expensesTable">
            <Table>
              <thead>
                <tr>
                  <th>Egreso</th>
                  <th>Valor</th>
                  <th>Fecha</th>
                </tr>
                { expenses.map(expense => (
                  <tr key={ expense.id }>
                    <td className="text-left">{ expense.description }</td>
                    <td>{ CurrencyFormat(expense.expense_value) }</td>
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
