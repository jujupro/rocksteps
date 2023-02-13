import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutBar from '../components/CheckoutBar'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen() {
  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, error, success } = orderCreate

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2)
  cart.shippingPrice = (cart.itemsPrice > 200 ? 0 : 10).toFixed(2)
  cart.taxPrice = Number(0.0625 * cart.itemsPrice).toFixed(2)

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment')
    }
    if (success) {
      navigate(`/order/${order._id}`) //_id is auto generated
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [success, navigate])

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems, //object
        shippingAddress: cart.shippingAddress, //object
        paymentMethod: cart.paymentMethod,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <div>
      <CheckoutBar step1 step2 step3 step4 />
      <Row className="justify-content-center">
        <Col md={7}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4 className="py-3">Shipping Address</h4>

              <p>
                {cart.shippingAddress.address.toUpperCase()},{' '}
                {cart.shippingAddress.city.toUpperCase()}
                {'  '}
                {cart.shippingAddress.postalCode},{'  '}
                {cart.shippingAddress.country.toUpperCase()}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4 className="py-3">Payment Method</h4>
              <p>
                {cart.paymentMethod ? cart.paymentMethod.toUpperCase() : ''}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4 className="py-3">Order Items</h4>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link
                            className="links"
                            to={`/product/${item.productId}`}
                          >
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className="text-center">
                <h4>Order Summary</h4>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items Total</Col>
                  <Col className="text-end">${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col className="text-end">${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col className="text-end">${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col className="text-end">${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    type="button"
                    className="btn-block py-3"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrder}
                  >
                    Place Order
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen
