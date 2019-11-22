import React from 'react';
import { SubtitleStyled } from '../../../../../../styles';
import { TDKey, TDInput } from '../../styles';
import { InputNumber } from 'antd';

function Coupon({ handleChange, discount }) {
  return (
    <>
      <SubtitleStyled>Cupón</SubtitleStyled>
      <table>
        <tbody>
          <tr>
            <TDKey>Cupon</TDKey>
            <TDInput>
              <InputNumber
                min={0}
                max={100}
                value={discount}
                onChange={handleChange}
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
              />
            </TDInput>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Coupon;
