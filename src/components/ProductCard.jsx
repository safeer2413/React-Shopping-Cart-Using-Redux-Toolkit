import { Button, Card } from 'react-bootstrap';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, removeCart } from '../store/cartSlice';

function ProductCard({ product }) {
  const cartList = useSelector((state) => state.cartState.cartList)
  const dispatch = useDispatch();
  const { id, name, price, image } = product;

  return (

    <>
      <div className="productCard shadow-sm">
        <Card>
          <Card.Img variant='top' src={image} alt={name} className="productCardImg" />
          <Card.Body>
            <Card.Title className="text-truncate">{name}</Card.Title>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <Card.Text className="mb-1"><strong>$ {price.toString().split('.')[0]}</strong></Card.Text>
              <Card.Text className="mb-1">{product.fastDelivery ? 'Fast Delivery' : '4 Days Delivery'}</Card.Text>
              <Rating rating={product.rating} />
            </Card.Subtitle>
            <div className="mt-3">
              {
                cartList.some(p => p.id === id) ? (
                  <Button variant='danger'
                    onClick={() => dispatch(removeCart(product))}>
                    Remove from Cart
                  </Button>
                ) : (
                  <Button disabled={!product.inStock} onClick={() => dispatch(addCart(product))}>
                    {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                )
              }
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default ProductCard