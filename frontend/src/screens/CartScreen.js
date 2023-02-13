import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen() {
  let navigate = useNavigate()
  let { id } = useParams()
  let [searchParams] = useSearchParams()

  const productId = id
  const qty = Number(searchParams.get('qty')) //...?qty=3

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const subtotal = Number(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
  )

  const shippingCost = subtotal > 200 ? 0 : 9.99

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  return (
    <Row className="justify-content-center">
      <Col md={7} className="mt-4">
        <h3>Your Cart</h3>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Keep Shopping</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.productId}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={5}>
                    <Link className={`links`} to={`/product/${item.productId}`}>
                      {item.name}
                    </Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.productId, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.productId)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={3}>
        <Card className="mt-4">
          <ListGroup variant="flush">
            <ListGroup.Item className="text-end">
              <h4>Order Summary</h4>
              <h6>
                {cartItems.reduce((acc, item) => acc + item.qty, 0)} item(s)
              </h6>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Item Total</Col>
                <Col className="text-end">${subtotal}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col className="text-end">
                  {subtotal > 99 ? 'FREE' : subtotal === 0 ? '-' : '$9.99'}
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Sale Tax</Col>
                <Col className="text-end">
                  {subtotal === 0
                    ? '-'
                    : `$${Number(subtotal * 0.0625).toFixed(2)}`}
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col className="text-end">
                  {subtotal === 0
                    ? '-'
                    : `$${Number(subtotal * 1.0625 + shippingCost).toFixed(2)}`}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <div className="d-grid">
                <Button
                  type="button"
                  className="btn-block py-3"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
