import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 0 1em 1em 1em;
`;

export const TDKey = styled.td`
  text-align: left;
`;

export const TDValue = styled.td`
  text-align: right;
`;

export const TRTotal = styled.tr`
  font-size: 1.3em;
`;

export const TDInput = styled.td`
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  padding: 5px 0 5px;

  input {
    text-align: center;
    width: 50%;
  }

  span {
    padding-right: 5px;
  }
`;
