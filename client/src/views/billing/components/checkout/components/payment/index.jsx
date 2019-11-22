import React from 'react';
import { SubtitleStyled } from '../../../../../../styles';
import { TDKey, TDValue, TDInput } from '../../styles';
import CurrencyFormat from '../../../../../../utils/CurrencyFormat';
import { InputNumber } from 'antd';

function Payment({ currentMoney, currentChange, handleChange }) {
  return (
    <>
      <SubtitleStyled>Pago</SubtitleStyled>
      <table>
        <tbody>
          <tr>
            <TDKey>Efectivo</TDKey>
            <TDInput>
              <InputNumber
                min={0}
                value={currentMoney}
                onChange={handleChange}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </TDInput>
          </tr>
          <tr>
            <TDKey>Cambio</TDKey>
            <TDValue>{CurrencyFormat(currentChange)}</TDValue>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Payment;
