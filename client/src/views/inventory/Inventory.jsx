import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProductsList, SearchProduct } from '../../components';

class Inventory extends Component {
  render() {
    const { products } = this.props;

    return (
      <div>
        <h1 className="text-center">Inventario</h1>
        <SearchProduct titleText="Buscar producto" mode="inventory" />
        <ProductsList products={ products } />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.inventory.products
});

export default connect(
  mapStateToProps
)(Inventory);
