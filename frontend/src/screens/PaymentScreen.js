import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutBar from '../components/CheckoutBar'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod)

  if (!shippingAddress.address) {
    navigate('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutBar step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend" className="mb-4">
            Select Method
          </Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal"
              id="paypal"
              value="paypal"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked={paymentMethod === 'paypal'}
              className="my-4"
            ></Form.Check>

            <Form.Check
              type="radio"
              label="Credit Cards"
              id="credit"
              value="credit"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-5"
              checked={paymentMethod === 'credit'}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
