import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';

class Finances extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Finanzas</h1>
        <Row>
          <Col lg="6">
            <Card>
              <CardBody>
                <CardTitle>Ingresos</CardTitle>
                $ 1'000.0000
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card lg="6">
              <CardBody>
                <CardTitle>Egresos</CardTitle>
                $ 500.0000
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Finances;
