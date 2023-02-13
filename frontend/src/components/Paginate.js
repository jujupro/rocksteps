import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split('?keyword=')[1].split('&')[0]
  }

  const navigate = useNavigate()

  const handler = (x) => {
    isAdmin
      ? navigate(`/admin/productlist/?keyword=${keyword}&page=${x + 1}`)
      : navigate(`/?keyword=${keyword}&page=${x + 1}`)
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <div key={x + 1} onClick={() => handler(x)}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </div>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
