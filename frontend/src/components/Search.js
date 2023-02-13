import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function Search() {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`)
    } else {
      navigate(location.search)
    }
  }

  return (
    <Form inline="true" className="d-flex" onSubmit={submitHandler}>
      <Form.Control
        type="text"
        placeholder="Search"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mx-2"
      ></Form.Control>

      <Button type="submit" variant="outline-success">
        <i className="fa fa-search"></i>
      </Button>
    </Form>
  )
}

export default Search
