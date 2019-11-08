import React from 'react';
import { SubtitleStyled } from '../../../../../../styles';
import { TDKey, TDValue, TDInput } from '../../styles';
import CurrencyFormat from '../../../../../../utils/CurrencyFormat';

function Payment({ currentMoney, currentChange, handleChange }) {
  const setCurrentMoney = (event) => {
    handleChange(event.target.value);
  }

  return (
    <>
      <SubtitleStyled>Pago</SubtitleStyled>
      <table>
        <tbody>
          <tr>
            <TDKey>Efectivo</TDKey>
            <TDInput>
              <input onChange={setCurrentMoney} min={0} type="number" value={currentMoney} />
              <span>$</span>
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
