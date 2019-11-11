import React, { useState, useEffect } from 'react';
import { Separator } from '../../../../styles';
import { Wrapper, ButtonsWrapper } from './styles';
import Balance from './components/balance';
import Coupon from './components/coupon';
import Payment from './components/payment';
import { Button } from 'antd';

function Checkout({ billing, handleCancel, handleUpdate, handleBilling }) {
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [currentMoney, setCurrentMoney] = useState(0);

  useEffect(() => {
    if (billing.brute === 0) {
      setGlobalDiscount(0);
    }
  }, [billing.brute]);

  const updateGlobalDiscount = (event) => {
    setGlobalDiscount(event.target.value);
    handleUpdate({ coupon: event.target.value });
  }

  const updateMoneyAmount = (event) => {
    setCurrentMoney(event.target.value);
    handleUpdate({ money: event.target.value });
  }

  const cancelBilling = () => {
    setGlobalDiscount(0);
    handleCancel();
  }

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
          Finalizar compra
        </Button>
        <Button
          disabled={billing.products.length === 0 && billing.coupon === 0}
          onClick={cancelBilling}
        >
          Cancelar compra
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default Checkout;
