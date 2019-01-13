import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, CardTitle, Col, Table, Row } from 'reactstrap';

class Finances extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Finanzas</h1>
        <Row>
          <Col lg="4">
            <Card>
              <CardBody>
                <CardTitle>Ingresos</CardTitle>
                $ 1'000.0000
                <CardFooter className="text-center">
                  <Button color="primary" outline>Registrar ingreso</Button>
                </CardFooter>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card>
              <CardBody>
                <CardTitle>Disponible</CardTitle>
                $ 500.0000
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card lg="6">
              <CardBody>
                <CardTitle>Egresos</CardTitle>
                $ 500.0000
                <CardFooter className="text-center">
                  <Button color="secondary" outline>Registrar egreso</Button>
                </CardFooter>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="6">
            <Table>
              <thead>
                <tr>
                  <th>Ingreso</th>
                  <th>Valor</th>
                  <th>Fecha</th>
                </tr>
              </thead>
            </Table>
          </Col>
          <Col lg="6">
          <Table>
              <thead>
                <tr>
                  <th>Egreso</th>
                  <th>Valor</th>
                  <th>Fecha</th>
                </tr>
              </thead>
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Finances;
