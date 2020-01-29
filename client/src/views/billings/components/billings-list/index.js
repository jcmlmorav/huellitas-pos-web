import React from 'react';
import { List, Button, Empty, Icon } from 'antd';
import CurrencyFormat from '../../../../utils/CurrencyFormat';
import { IconButtonContainer } from '../../../../styles';
import { NavLink } from 'react-router-dom';
import {
  HeaderStyled,
  ColumnStyled,
  DateColumnStyled,
  TotalColumnStyled,
  HeaderActionsColumnStyled,
  ActionsColumnStyled
} from './styles';

function BillingsList({ billings }) {
  const emptyState = {
    emptyText: (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Cargando facturas'} />)
  };

  return (
    <List
      size="small"
      bordered
      locale={emptyState}
      dataSource={billings}
      header={
        <HeaderStyled>
          <DateColumnStyled><strong>Fecha</strong></DateColumnStyled>
          <TotalColumnStyled><strong>Total</strong></TotalColumnStyled>
          <HeaderActionsColumnStyled><strong>Ver</strong></HeaderActionsColumnStyled>
        </HeaderStyled>
      }
      renderItem={item => (
        <List.Item>
          <ColumnStyled>
            <DateColumnStyled>{item.created_at}</DateColumnStyled>
            <TotalColumnStyled>{CurrencyFormat(item.total)}</TotalColumnStyled>
            <ActionsColumnStyled>
              <IconButtonContainer>
                {/* TODO: Button for Edit */}
              </IconButtonContainer>
              <IconButtonContainer>
                <NavLink to={`/facturas/${item.id}`}><Icon type="eye" /></NavLink>
              </IconButtonContainer>
            </ActionsColumnStyled>
          </ColumnStyled>
        </List.Item>
      )}
    />
  )
}

export default BillingsList;
