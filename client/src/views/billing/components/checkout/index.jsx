import React, { useState, useEffect } from 'react';
import { Separator } from '../../../../styles';
import { Wrapper, ButtonsWrapper } from './styles';
import Balance from './components/balance';
import Coupon from './components/coupon';
import Payment from './components/payment';
import { Button } from 'antd';

function Checkout({ billing, handleCancel, handleUpdate, handleBilling, billingMode }) {
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [currentMoney, setCurrentMoney] = useState(0);

  useEffect(() => {
    if (billing.brute === 0) {
      setGlobalDiscount(0);
      setCurrentMoney(0);
      document.getElementById('searchProduct').focus();
    }
  }, [billing.brute]);

  const updateGlobalDiscount = (value) => {
    setGlobalDiscount(value);
    handleUpdate({ coupon: value });
  }

  const updateMoneyAmount = (value) => {
    setCurrentMoney(value);
    handleUpdate({ money: value });
  }

  const cancelBilling = () => {
    setGlobalDiscount(0);
    handleCancel();
  }

  const submitButtonText = billingMode === 'new' ? 'Finalizar compra' : 'Actualizar compra';

  return (
    <Wrapper>
      <Balance billing={billing} />
      <Separator />
      <Coupon
        billing={billing}
        discount={globalDiscount}
        handleChange={updateGlobalDiscount} />
      <Separator />
      <Payment
        currentMoney={currentMoney}
        handleChange={updateMoneyAmount}
        currentChange={currentMoney - billing.total} />
      <Separator />
      <ButtonsWrapper>
        <Button
          type="primary"
          disabled={!(parseInt(currentMoney) >= parseInt(billing.total) && billing.products.length > 0)}
          onClick={handleBilling}
        >
          {submitButtonText}
        </Button>
        {billingMode === 'new' && (
          <Button
            disabled={billing.products.length === 0 && billing.coupon === 0}
            onClick={cancelBilling}
          >
            Cancelar compra
          </Button>
        )}
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default Checkout;
