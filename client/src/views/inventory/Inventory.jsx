import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProducts } from '../../actions/inventory';
import { ProductsList, SearchProduct } from '../../components';

class Inventory extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.boundActionCreators = bindActionCreators(getProducts, dispatch);
  }

  componentDidMount() {
    let { dispatch } = this.props;
    dispatch(getProducts());
  }

  render() {
    const { products, error } = this.props;

    console.log(error);

    return (
      <div>
        <h1 className="text-center">Inventario</h1>
        <SearchProduct titleText="Buscar producto" mode="inventory" />
        <ProductsList products={ products } error={ error } />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.inventory.products,
  error: state.inventory.error
});

export default connect(mapStateToProps)(Inventory);
