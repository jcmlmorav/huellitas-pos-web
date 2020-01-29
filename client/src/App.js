import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import Billing from './views/billing';
import Billings from './views/billings';
import { Box, Customers, Inventory, Finances } from './views';
import 'antd/dist/antd.css';
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
          <Navbar expand="md">
            <NavbarBrand href="/" tabIndex="-1">COLMILLITOS</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="menu__item" tabIndex="-1" to="/">Nueva venta!</NavLink>
              </NavItem>
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

          <Route path="/" exact component={Billing} />
          <Route path="/clientes/" component={Customers} />
          <Route path="/inventario/" component={Inventory} />
          <Route path="/finanzas/" component={Finances} />
          <Route path="/caja/" component={Box} />
          <Route path="/facturas/:id?" component={Billings} />
        </div>
      </Router>
    );
  }
}

export default App;
