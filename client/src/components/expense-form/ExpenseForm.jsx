import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addExpense } from '../../actions/finances';
import {
  Alert,
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      description: '',
      expense_value: 0
    };

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators(addExpense, dispatch);
  }

  static getDerivedStateFromProps(props, state) {
    if (Object.keys(props.createdExpense).length > 0 && props.isOpen) {
      props.toggle();

      return {
        ...state,
        description: '',
        expense_value: ''
      }
    }
    return {
      ...state,
      isOpen: props.isOpen
    };
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  toggle = () => {
    const { toggle } = this.props;

    this.setState({
      description: '',
      expense_value: 0
    });

    toggle();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { description, expense_value } = this.state;
    const { dispatch } = this.props;

    dispatch(addExpense({ description, expense_value }));
  }

  render() {
    const { error } = this.props;
    const { isOpen, description, expense_value } = this.state;

    let descriptionError = '',
        generalError = '',
        valueError = '';

    if( error && Object.keys(error).length ) {
      if( 'failed' in error ) {
        generalError = (<Alert color="danger">{ error.failed }</Alert>);
      }
      if( 'description' in error ) {
        descriptionError = (<FormFeedback>{ error.description }</FormFeedback>);
      }
      if( 'expense_value' in error ) {
        valueError = (<FormFeedback>{ error.expense_value }</FormFeedback>);
      }
    }

    return (
      <Modal isOpen={ isOpen }>
        <ModalHeader>Registrar egreso</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="description">Descripción</Label>
              <Input type="text" name="description" id="description" onChange={ this.handleInputChange } tabIndex="1" value={ description } invalid={ !(descriptionError === '') } />
              { descriptionError }
            </FormGroup>
            <FormGroup>
              <Label for="expense_value">Valor</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input type="number" name="expense_value" id="expense_value" onChange={ this.handleInputChange } tabIndex="2" value={ expense_value } invalid={ !(valueError === '') } />
                { valueError }
              </InputGroup>
            </FormGroup>
          </Form>
          { generalError }
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={ this.toggle } outline tabIndex="-1">Cancelar</Button>
          <Button color="primary" onClick={ this.handleSubmit } tabIndex="-1">Guardar</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToprops = (state) => ({
  createdExpense: state.finances.createdExpense,
  error: state.finances.error
});

export default connect(mapStateToprops)(ExpenseForm);
