import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import Rating from './Rating'
import { useDispatch, useSelector } from 'react-redux'
import { addPrice, removeCart } from '../store/cartSlice'

function CartCard() {
  const dispatch = useDispatch()
  const cartList = useSelector((state) => state.cartState.cartList)

  return (
    <Row className="gy-4 bg-warning shadow-lg p-4 rounded-4">
      {cartList.map((product) => (
        <Col xs={12} key={product.id}>
          <Card className="shadow rounded-4 hover-card p-3">
            <Row className="align-items-center">

              {/* Image */}
              <Col xs={12} md={2} className="d-flex justify-content-center">
                <Card.Img
                  src={product.image}
                  alt={product.name}
                  style={{
                    borderRadius: '20px',
                    objectFit: 'contain',
                    height: '120px',
                    padding: '10px',
                  }}
                />
              </Col>

              {/* Product Details */}
              <Col xs={12} md={6}>
                <Card.Body>
                  <Card.Title className="mb-2">{product.name}</Card.Title>
                  <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
                  <Card.Text><strong>Delivery:</strong> {product.fastDelivery ? 'Fast Delivery' : '3-5 days'}</Card.Text>
                  <Rating rating={product.rating} />
                </Card.Body>
              </Col>

              {/* Quantity + Remove (inline) */}
              <Col xs={12} md={4}>
                <div className="d-flex flex-wrap justify-content-md-end align-items-center gap-3 px-2 mt-2 mt-md-0">
                  <b>Qty:</b>
                  {/* Dropdown */}
                  <Form.Select
                    value={product.qty}
                    onChange={(e) =>
                      dispatch(
                        addPrice({
                          id: product.id,
                          qty: parseInt(e.target.value, 10) || 1,   // Prevents NaN
                        })
                      )
                    }
                    style={{ width: '70px', cursor: 'pointer' }}
                  >
                    {[...Array(product.inStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Select>

                  {/* Remove Button */}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => dispatch(removeCart(product))}
                  >
                    Remove
                  </Button>
                </div>
              </Col>

            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default CartCard
