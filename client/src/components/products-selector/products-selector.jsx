import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { setSelectedProduct } from '../../actions/inventory';
import CurrencyFormat from '../../utils/CurrencyFormat';
import './styles.scss';

class ProductsSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators(setSelectedProduct, dispatch);
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      isOpen: props.isOpen
    }
  }

  toggle = () => {
    this.props.onClose();
  }

  handleProductSelected(product) {
    const { dispatch } = this.props;
    dispatch(setSelectedProduct(product));
  }

  render() {
    const { products } = this.props;
    return (
      <Modal toggle={ this.toggle } isOpen={ this.state.isOpen }>
        <ModalHeader toggle={ this.toggle }>Seleccione el producto</ModalHeader>
        <ModalBody>
          <ListGroup>
            { products.map(product => (
              <ListGroupItem key={ product.id }>
                <div className="productsSelector__container">
                  <div>
                    { product.description }
                    <br />
                    { CurrencyFormat(product.price) }
                  </div>
                  <Button key={ product.id } color="primary" onClick={ () => { this.handleProductSelected(product) } }>Elegir</Button>
                </div>
              </ListGroupItem>
            )) }
          </ListGroup>
        </ModalBody>
      </Modal>
    )
  }
}

export default connect()(ProductsSelector);
