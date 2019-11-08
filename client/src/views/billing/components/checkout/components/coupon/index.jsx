import React from 'react';
import { SubtitleStyled } from '../../../../../../styles';
import { TDKey, TDValue, TDInput } from '../../styles';
import CurrencyFormat from '../../../../../../utils/CurrencyFormat';

function Coupon({ handleChange, discount, billing }) {
  return (
    <>
      <SubtitleStyled>Cupón</SubtitleStyled>
      <table>
        <tbody>
          <tr>
            <TDKey>Cupon</TDKey>
            <TDInput>
              <input onChange={handleChange} min={0} max={100} type="number" value={discount} />
              <span>%</span>
            </TDInput>
          </tr>
          <tr>
            <TDKey>Descuento</TDKey>
            <TDValue>{CurrencyFormat(billing.total * (discount / 100))}</TDValue>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Coupon;
