import React, { useState } from 'react';
import { Separator } from '../../../../styles';
import { Wrapper, ButtonsWrapper } from './styles';
import Balance from './components/balance';
import Coupon from './components/coupon';
import Payment from './components/payment';
import { Button } from 'antd';

function Checkout({ billing, handleCancel }) {
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [currentMoney, setCurrentMoney] = useState(0);

  const handleGlobalDiscount = (event) => {
    setGlobalDiscount(event.target.value);
  }

  const handleMoneyAmount = (event) => {
    setCurrentMoney(event.target.value);
  }

  return (
    <Wrapper>
      <Balance billing={billing} />
      <Separator />
      <Coupon
        billing={billing}
        discount={globalDiscount}
        handleChange={handleGlobalDiscount} />
      <Separator />
      <Payment
        currentMoney={currentMoney}
        handleChange={handleMoneyAmount}
        currentChange={currentMoney - billing.total} />
      <Separator />
      <ButtonsWrapper>
        <Button
          type="primary"
          disabled={!(parseInt(currentMoney) >= parseInt(billing.total) && billing.products.length > 0)}
        >
          Finalizar compra
        </Button>
        <Button disabled={billing.products.length === 0} onClick={() => handleCancel()}>Cancelar compra</Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default Checkout;
