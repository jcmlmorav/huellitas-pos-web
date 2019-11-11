import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TitleStyled } from '../../styles';
import { WrapperStyled, ContentStyled, SidebarStyled } from './styles';
import { SearchProduct } from '../../components';
import { BillingProducts } from '../../components';
import Checkout from './components/checkout';
import TYPES from '../../constants/types';

function Billing() {
  const dispatch = useDispatch();
  const billing = useSelector(state => state.billings.billing);

  console.log(billing);

  useEffect(() => {
    dispatch({ type: TYPES.GET_PRODUCTS });
  });

  const cancel = () => {
    dispatch({ type: TYPES.CLEAN_BILLING });
  }

  const update = () => {
    console.log('Update available');
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
            />
          </SidebarStyled>
      </WrapperStyled>
    </>
  );
}

export default Billing;
