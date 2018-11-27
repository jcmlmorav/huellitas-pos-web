import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/inventory';
import { ProductsList, SearchProduct } from '../../components';

class Inventory extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

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

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
