import React from 'react';
import { SubtitleStyled } from '../../../../../../styles';
import { TDKey, TDValue, TRTotal } from '../../styles';
import CurrencyFormat from '../../../../../../utils/CurrencyFormat';

function Balance({ billing: { brute, discount, total, coupon, coupon_discount }}) {
  return (
    <>
      <SubtitleStyled>Balance</SubtitleStyled>
      <table>
        <tbody>
          {(discount > 0 || coupon > 0) && (
            <tr>
              <TDKey>Subtotal</TDKey>
              <TDValue>{CurrencyFormat(brute)}</TDValue>
            </tr>
          )}
          {discount > 0 && (
            <tr>
              <TDKey>Descuento</TDKey>
              <TDValue>{CurrencyFormat(discount)}</TDValue>
            </tr>
          )}
          {coupon > 0 && (
            <tr>
            <TDKey>Cupón</TDKey>
            <TDValue>{CurrencyFormat(coupon_discount)}</TDValue>
          </tr>
          )}
          <TRTotal>
            <TDKey><strong>Total</strong></TDKey>
            <TDValue><strong>{CurrencyFormat(total)}</strong></TDValue>
          </TRTotal>
        </tbody>
      </table>
    </>
  );
}

export default Balance;
