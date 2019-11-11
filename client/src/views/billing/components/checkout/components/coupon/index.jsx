import React from 'react';
import { SubtitleStyled } from '../../../../../../styles';
import { TDKey, TDInput } from '../../styles';

function Coupon({ handleChange, discount }) {
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
        </tbody>
      </table>
    </>
  );
}

export default Coupon;
