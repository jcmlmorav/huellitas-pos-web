import React, { Component } from 'react';
import { SearchProduct } from '../../components';

class Billing extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Facturación</h1>
        <SearchProduct titleText="Registrar producto" mode="billing" />
      </div>
    )
  }
}

export default Billing;
