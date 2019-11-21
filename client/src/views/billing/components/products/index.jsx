import React from 'react';
import { Table, Empty, Button } from 'antd';
import CurrencyFormat from '../../../../utils/CurrencyFormat';
import { InputNumber } from 'antd';
import {
  PriceStyled,
  DiscountStyled,
  TotalStyled,
  DeleteContainer,
  QuantityWrapper
} from './styles';

function Products({ products, onUpdateQuantity, onRemoveProduct }) {
  const updateQuantity = (value, id) => {
    onUpdateQuantity(id, value);
  }

  const removeProduct = (product) => {
    onRemoveProduct(product);
  }

  const columns = [
    {
      title: 'Código',
      dataIndex: 'barcode',
      key: 'barcode',
      render: barcode => barcode
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      render: description => description
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
      render: ({ quantity, id }) => (
        <QuantityWrapper>
          <InputNumber
            min={0}
            defaultValue={quantity}
            onChange={ (value) => updateQuantity(value, id) }
          />
        </QuantityWrapper>
      )
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      render: price => (
        <PriceStyled>
          { CurrencyFormat(price) }
        </PriceStyled>
      )
    },
    {
      title: 'Descuento',
      dataIndex: 'discount',
      key: 'discount',
      render: discount => (
        <DiscountStyled>
          { CurrencyFormat(discount) }
        </DiscountStyled>
      )
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: total => (
        <TotalStyled>
          { CurrencyFormat(total) }
        </TotalStyled>
      )
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: product => (
        <DeleteContainer>
          <Button
            type="primary"
            shape="circle"
            icon="delete"
            onClick={() => removeProduct(product)}
          />
        </DeleteContainer>
      )
    }
  ];

  const data = products.map(product => {
    return {
      key: product.id,
      barcode: product.barcode,
      description: product.description,
      price: product.price,
      discount: (product.price * (product.discount / 100)) * product.quantity,
      total: product.price * (1 - (product.discount / 100)) * product.quantity,
      quantity: { quantity: product.quantity, id: product.id },
      action: product
    }
  });

  const emptyState = {
    emptyText: (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Aún no hay productos'} />)
  };

  return (
    <Table columns={columns} dataSource={data} locale={emptyState} pagination={{ position: 'none' }} />
  );
}

export default Products;
