import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import { Billing, Clients, Inventory, Finances } from './views';
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
            <NavbarBrand href="/">HUELLITAS</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="menu__item" to="/">Facturación</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="menu__item" to="/clientes">Clientes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="menu__item" to="/inventario">Inventario</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="menu__item" to="/finanzas">Finanzas</NavLink>
              </NavItem>
            </Nav>
          </Navbar>

          <Container>
            <Row>
              <Col>
                <Route path="/" exact component={ Billing } />
                <Route path="/clientes/" component={ Clients } />
                <Route path="/inventario/" component={ Inventory } />
                <Route path="/finanzas/" component={ Finances } />
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
