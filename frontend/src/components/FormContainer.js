import React from 'react'
import { Row, Col } from 'react-bootstrap'

function FormContainer({ children }) {
  return (
    <div>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} className="hidden-xs">
          <img
            src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
            className="img-fluid"
            style={{ width: '100%', height: '80vh', objectFit: 'cover' }}
            alt="login"
          />
        </Col>
        <Col xs={12} md={4} className="mt-5">
          {children}
        </Col>
      </Row>
    </div>
  )
}

export default FormContainer
