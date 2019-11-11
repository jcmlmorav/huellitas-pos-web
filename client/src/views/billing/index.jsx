import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TitleStyled } from '../../styles';
import { WrapperStyled, ContentStyled, SidebarStyled } from './styles';
import { SearchProduct } from '../../components';
import { BillingProducts } from '../../components';
import Checkout from './components/checkout';
import { getProducts } from '../../actions/inventory';
import { cleanBilling, updateCoupon, addBilling } from '../../actions/billing';

function Billing() {
  const dispatch = useDispatch();
  const billing = useSelector(state => state.billings.billing);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    dispatch(getProducts());
  });

  const cancel = () => {
    dispatch(cleanBilling());
  }

  const bill = () => {
    dispatch(addBilling(billing, money, (money - billing.total)));

    setTimeout(() => {
      window.location = "/compra";
    }, 2000);
  }

  const update = (update) => {
    if (update.coupon !== undefined) {
      dispatch(updateCoupon(update.coupon));
    }

    if (update.money !== undefined) {
      setMoney(update.money);
    }
  }

  return (
    <>
      <TitleStyled>Facturación</TitleStyled>
      <WrapperStyled>
        <ContentStyled>
            <SearchProduct titleText="Agregar producto" mode="billing" />
            <BillingProducts />
          </ContentStyled>
          <SidebarStyled>
            <Checkout
              billing={billing}
              handleUpdate={update}
              handleCancel={cancel}
              handleBilling={bill}
            />
          </SidebarStyled>
      </WrapperStyled>
    </>
  );
}

export default Billing;
