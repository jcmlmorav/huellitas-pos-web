import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TitleStyled, WrapperStyled, ContentStyled, SidebarStyled } from '../../styles';
import { SearchProduct } from '../../components';
import Checkout from './components/checkout';
import Products from './components/products';
import { getProducts } from '../../actions/inventory';
import {
  cleanBilling,
  updateCoupon,
  addBilling,
  updateBilling,
  updateProductQuantity,
  removeProductFromBilling,
  fetchEditBilling
} from '../../actions/billing';

function Billing({ match }) {
  const dispatch = useDispatch();
  const billing = useSelector(state => state.billings.billing);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    dispatch(getProducts());
    if (match.params.id > 0) {
      dispatch(fetchEditBilling(match.params.id));
    }
  }, [dispatch, match.params.id]);

  const cancel = () => {
    dispatch(cleanBilling());
  }

  const bill = () => {
    if (!match.params.id) {
      dispatch(addBilling(billing, money, (money - billing.total)));
    } else {
      dispatch(updateBilling(billing, money, (money - billing.total)));
    }
  }

  const update = (update) => {
    if (update.coupon !== undefined) {
      dispatch(updateCoupon(update.coupon));
    }

    if (update.money !== undefined) {
      setMoney(update.money);
    }
  }

  const handleQuantityUpdate = (id, quantity) => {
    dispatch(updateProductQuantity(id, quantity));
  }

  const handleRemoveProduct = (product) => {
    dispatch(removeProductFromBilling(product));
  }

  return (
    <>
      <TitleStyled>Facturación</TitleStyled>
      <WrapperStyled>
        <ContentStyled>
            <SearchProduct titleText="Agregar producto" mode="billing" />
            <Products
              products={billing.products}
              onUpdateQuantity={handleQuantityUpdate}
              onRemoveProduct={handleRemoveProduct}
            />
          </ContentStyled>
          <SidebarStyled>
            <Checkout
              billing={billing}
              handleUpdate={update}
              handleCancel={cancel}
              handleBilling={bill}
              billingMode={!match.params.id ? 'new' : 'update'}
            />
          </SidebarStyled>
      </WrapperStyled>
    </>
  );
}

export default Billing;
