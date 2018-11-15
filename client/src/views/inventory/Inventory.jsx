import React, { Component } from 'react';
import { ProductsList, SearchProduct } from '../../components';
import PRODUCTS from '../../constants/products.mock';

class Inventory extends Component {
  constructor() {
    super();

    this.state = { products: PRODUCTS };
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <h1 className="text-center">Inventario</h1>
        <SearchProduct titleText="Buscar producto" mode="inventory" />
        <ProductsList products={ products } />
      </div>
    )
  }
}

export default Inventory;
