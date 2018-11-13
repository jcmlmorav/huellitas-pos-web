import React, { Component } from 'react';
import { ProductsList, SearchProduct } from '../../components';

class Inventory extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Inventario</h1>
        <SearchProduct titleText="Buscar producto" mode="inventory" />
        <ProductsList />
      </div>
    )
  }
}

export default Inventory;
