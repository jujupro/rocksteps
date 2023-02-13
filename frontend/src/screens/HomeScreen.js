import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { Carousel, Image } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'

function HomeScreen() {
  const dispatch = useDispatch()
  const location = useLocation()
  let searchStr = location.search

  const productList = useSelector((state) => state.productList)
  const { error, loading, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(searchStr))
  }, [dispatch, searchStr])

  return (
    <div>
      <Carousel className="mb-3">
        <Carousel.Item>
          <Image
            src="https://shop-rose-bucket.s3.amazonaws.com/home2.jpg"
            alt="home2"
            fluid
          />
          <Carousel.Caption>
            <h1>REACH NEW HEIGHTS</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="https://shop-rose-bucket.s3.amazonaws.com/home1.jpg"
            alt="home1"
            fluid
          />
          <Carousel.Caption>
            <h1>ASCEND TO ADVENTURE</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <h2>New Arrivals</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={searchStr} />
        </div>
      )}
    </div>
  )
}

export default HomeScreen
