import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Image, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

function ProfileScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  let navigate = useNavigate()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { error, loading, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        //last check to reload profile when admin user view other user's profile
        dispatch({ type: USER_UPDATE_PROFILE_RESET }) //clean the userUpdateProfie state first
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, navigate, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      )
      setMessage('')
    }
  }

  function formatDate(dateStr) {
    let date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Row className="justify-content-between mt-2">
      <Col md={3}>
        <h3>My Profile</h3>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="passwordConfirm" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={8}>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3>My Orders</h3>
            {orders.length === 0 && <p>You have no order.</p>}
            <ListGroup>
              {orders.map((order, index) => {
                return (
                  <Form
                    className="my-2 mx-5"
                    style={{ maxWidth: '450px', textAlign: 'left' }}
                    key={index}
                  >
                    <ListGroup.Item>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Row>
                          <h5>
                            {formatDate(order.createdAt.substring(0, 10))}{' '}
                            <i className="fa-solid fa-arrow-right"></i> $
                            {order.totalPrice}{' '}
                          </h5>
                          <hr></hr>
                          {order.orderItems.map((product, index) => {
                            return (
                              <Row key={index}>
                                <Col sm={3}>
                                  <Image
                                    style={{
                                      maxHeight: '50px',
                                      display: 'block',
                                      margin: '0 auto',
                                    }}
                                    fluid
                                    src={product.image}
                                  ></Image>
                                </Col>
                                <Col sm={9}>
                                  <small>{product.qty} X </small>
                                  <small>{product.name}</small>
                                  <Row>
                                    <Col>
                                      <p>
                                        $
                                        {(product.qty * product.price).toFixed(
                                          2
                                        )}
                                      </p>
                                    </Col>
                                    <Col>
                                      <p>Size: {product.size}</p>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            )
                          })}
                        </Row>
                      </LinkContainer>
                    </ListGroup.Item>
                  </Form>
                )
              })}
            </ListGroup>
          </div>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
