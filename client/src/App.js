import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import { Billing, BillingDetail, Box, Customers, Inventory, Finances, Sale, Billings } from './views';
import { Container, Row, Col } from 'reactstrap';
import './App.scss';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/" tabIndex="-1">COLMILLITOS</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="menu__item" tabIndex="-1" to="/">Nueva venta!</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="menu__item" tabIndex="-1" to="/compra">Última compra</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink className="menu__item" tabIndex="-1" to="/clientes">Clientes</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink className="menu__item" tabIndex="-1" to="/caja">Caja</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="menu__item" tabIndex="-1" to="/facturas">Facturas</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="menu__item" tabIndex="-1" to="/inventario">Inventario</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="menu__item" tabIndex="-1" to="/finanzas">Finanzas</NavLink>
              </NavItem>
            </Nav>
          </Navbar>

          <Container>
            <Row>
              <Col>
                <Route path="/" exact component={ Billing } />
                <Route path="/clientes/" component={ Customers } />
                <Route path="/inventario/" component={ Inventory } />
                <Route path="/finanzas/" component={ Finances } />
                <Route path="/compra/" component={ Sale } />
                <Route path="/caja/" component={ Box } />
                <Route path="/facturas" component={ Billings } />
                <Route path="/factura/:id" component={ BillingDetail } />
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
