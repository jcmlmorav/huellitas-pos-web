import React from 'react';
import Logo from '../../../../assets/colmillitos-pos.jpg';
import CurrencyFormat from '../../../../utils/CurrencyFormat';
import './styles.scss';

function BillingDetail({ billing }) {
  let discount = 0;
  let subtotal = 0;

  const print = () => {
    window.print();
  }

  return (
    <>
      <button className="printBtn hide" onClick={print}>Imprimir</button>
      <div className="printing">
        <img className="logo" src={Logo} alt="Logo Colmillitos" />
        <h5>Tienda para mascotas</h5>
        <h5>Peluquería & Spa</h5>
        <br />
        <h6>Comprobante de compra</h6>
        <h6>Régimen simplificado</h6>
        <h6>NIT. 1038770891-8</h6>
        <h6>Calle 79A # 52 A 87</h6>
        <h6>Teléfono: 3205644443</h6>
        <h6>Itaguí, Antioquia</h6>
        <br />
        <h6>Fecha: { billing.created_at }</h6>
        <hr />
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Descripción</th>
              <th className="priceHead">Valor</th>
            </tr>
          </thead>
          <tbody>
            { billing.products.map(product => {
              discount = discount + (((product.pivot.discount / 100) * product.pivot.price) * product.pivot.quantity);
              subtotal = subtotal + (product.pivot.price * product.pivot.quantity);

              return (
                <tr key={ product.id }>
                  <td>{ product.pivot.quantity }x&nbsp;</td>
                  <td className="mayus">
                    { product.description }
                    { product.pivot.discount > 0 && 
                      <>
                        <br /><small>Ahorro: { CurrencyFormat((((product.pivot.discount / 100) * product.pivot.price) * product.pivot.quantity).toFixed(2)) }</small>
                      </>
                    }
                  </td>
                  <td className="priceColumn">
                    { product.pivot.discount > 0 ? CurrencyFormat((((1 - (product.pivot.discount / 100)) * product.pivot.price) * product.pivot.quantity).toFixed(2)) : CurrencyFormat((product.pivot.price * product.pivot.quantity).toFixed(2)) }
                  </td>
                </tr>
              )
            }) }
          </tbody>
        </table>
        <hr/>
        { (discount > 0 || billing.coupon > 0) && (
          <>
            {billing.coupon > 0 && (
              <>
                <h6><strong>Cupón aplicado: {billing.coupon.toFixed(0)}%</strong></h6>
                <br />
              </>
            )}
            <h6>Subtotal: { CurrencyFormat(subtotal.toFixed(2)) }</h6>
            <h6>Ahorro: { CurrencyFormat(discount + billing.coupon_discount) }</h6>
            <br />
          </>
        ) }
        <h4>TOTAL: { CurrencyFormat(billing.total) }</h4>
        <hr/>
        <table>
          <tbody>
            <tr>
              <td>Efectivo:</td>
              <td>{ CurrencyFormat(billing.money) }</td>
            </tr>
            <tr>
              <td>Cambio:</td>
              <td>{ CurrencyFormat(billing.change) }</td>
            </tr>
          </tbody>
        </table>
        <br /><br />
        <h6>Gracias por su compra</h6>
        <h6><strong>Visítanos en WWW.COLMILLITOS.PET</strong></h6>
      </div>
    </>
  );
};

export default BillingDetail;
