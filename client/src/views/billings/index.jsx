import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TitleStyled, WrapperStyled, ContentStyled, SidebarStyled } from '../../styles';
import { getBillings, getLastBilling, getBillingById } from '../../actions/billing';
import BillingsList from './components/billings-list';
import BillingDetail from './components/billing-detail';

function Billings({ match }) {
  const dispatch = useDispatch();
  const billings = useSelector(state => state.billings.billings);
  const billing = useSelector(state => state.billings.selectedBilling);

  useEffect(() => {
    dispatch(getBillings());
    if (match.params.id === undefined) {
      dispatch(getLastBilling());
    } else {
      dispatch(getBillingById(match.params.id));
    }
  }, [dispatch, match.params.id]);

  return (
    <>
      <TitleStyled>Facturas</TitleStyled>
      <WrapperStyled>
        <ContentStyled>
          { Object.keys(billing).length > 1 && (
            <BillingDetail billing={billing} />
          )}
        </ContentStyled>
        <SidebarStyled className="sidebar">
          <BillingsList billings={billings} />
        </SidebarStyled>
      </WrapperStyled>
    </>
  );
}

export default Billings;
