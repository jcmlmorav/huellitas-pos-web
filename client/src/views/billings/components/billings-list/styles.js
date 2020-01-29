import styled from 'styled-components';

export const HeaderStyled = styled.div`
  width: 100%;
`;

export const ColumnStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const DateColumnStyled = styled.div`
  display: inline-block;
  text-align: center;
  width: 40%;
`;

export const TotalColumnStyled = styled.div`
  display: inline-block;
  text-align: center;
  width: 25%;
`;

export const HeaderActionsColumnStyled = styled.div`
  display: inline-block;
  text-align: center;
  width: 35%;
`;

export const ActionsColumnStyled = styled.div`
  display: inline-block;
  text-align: center;
  width: 35%;
  display: flex;
  align-items: center;

  div {
    display: inline-block;
    width: 50%;

    a.active {
      border-color: #bb2972;
      color: white !important;
      height: 32px;
      display: block;
      line-height: 11px;

      i {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #bb2972;
        padding-top: 5px;
      }
    }
  }
`;
