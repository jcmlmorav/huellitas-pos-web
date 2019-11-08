import React, { useState } from 'react';
import { Separator } from '../../../../styles';
import { Wrapper } from './styles';
import Balance from './components/balance';
import Coupon from './components/coupon';
import Payment from './components/payment';

function Checkout({ billing }) {
  const [localDiscount, setLocalDiscount] = useState(0);
  const [currentMoney, setCurrentMoney] = useState(0);

  const applyLocalDiscount = (event) => {
    setLocalDiscount(event.target.value);
  }

  const handleMoneyAmount = (money) => {
    setCurrentMoney(money);
  }

  return (
    <Wrapper>
      <Balance billing={billing} />
      <Separator />
      <Coupon handleChange={applyLocalDiscount} discount={localDiscount} billing={billing} />
      <Separator />
      <Payment
        handleChange={handleMoneyAmount}
        currentMoney={currentMoney}
        currentChange={currentMoney - billing.total} />
    </Wrapper>
  );
};

export default Checkout;
