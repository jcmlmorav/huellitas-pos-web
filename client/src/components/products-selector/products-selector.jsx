import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader } from 'reactstrap';
import CurrencyFormat from '../../utils/CurrencyFormat';
import './styles.scss';

class ProductsSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
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
    /* this.props.handleProductSelected(product); */
  }

  render() {
    const { products } = this.props;
    return (
      <Modal isOpen={ this.state.isOpen }>
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
                  <Button key={ product.id } color="primary" onClick={ () => { this.handleProductSelected(product) } }>
                    Agregar
                  </Button>
                </div>
              </ListGroupItem>
            )) }
          </ListGroup>
        </ModalBody>
      </Modal>
    )
  }
}

export default ProductsSelector;
