import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addIncome } from '../../actions/finances';
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

class IncomeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      description: '',
      income_value: 0
    };

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators(addIncome, dispatch);
  }

  static getDerivedStateFromProps(props, state) {
    if (Object.keys(props.createdIncome).length > 0 && props.isOpen) {
      props.toggle();

      return {
        ...state,
        description: '',
        income_value: ''
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
      income_value: 0
    });

    toggle();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { description, income_value } = this.state;
    const { dispatch } = this.props;

    dispatch(addIncome({ description, income_value }));
  }

  render() {
    const { error } = this.props;
    const { isOpen, description, income_value } = this.state;

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
      if( 'income_value' in error ) {
        valueError = (<FormFeedback>{ error.income_value }</FormFeedback>);
      }
    }

    return (
      <Modal isOpen={ isOpen }>
        <ModalHeader>Registrar ingreso</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="description">Descripción</Label>
              <Input type="text" name="description" id="description" onChange={ this.handleInputChange } tabIndex="1" value={ description } invalid={ !(descriptionError === '') } />
              { descriptionError }
            </FormGroup>
            <FormGroup>
              <Label for="income_value">Valor</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input type="number" name="income_value" id="income_value" onChange={ this.handleInputChange } tabIndex="2" value={ income_value } invalid={ !(valueError === '') } />
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
  createdIncome: state.finances.createdIncome,
  error: state.finances.error
});

export default connect(mapStateToprops)(IncomeForm);
