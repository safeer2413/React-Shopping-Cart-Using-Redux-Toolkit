import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart } from "../store/cartSlice";

function ProductCard({ product }) {
  const cartList = useSelector((state) => state.cartState.cartList);
  const dispatch = useDispatch();
  const { id, name, price, image, fastDelivery, rating, inStock } = product;

  const inCart = cartList.some((p) => p.id === id);

  return (
    <Card className="shadow rounded-4 mt-3 h-auto border-0 hover-card">
      {/* Product Image */}
      <Card.Img
        variant="top"
        src={image}
        alt={name}
        className="p-3"
        style={{
          height: "200px",
          objectFit: "contain",
        }}
      />

      {/* Product Content */}
      <Card.Body className="d-flex flex-column justify-content-between">

        <div>
          <Card.Title className="text-truncate">{name}</Card.Title>

          <Card.Text className="mb-1 fw-bold">$ {price.toString().split(".")[0]}</Card.Text>

          <Card.Text className="mb-1">
            {fastDelivery ? "Fast Delivery" : "4 Days Delivery"}
          </Card.Text>

          <Rating rating={rating} />
        </div>

        <div className="mt-3">
          {inCart ? (
            <Button variant="danger" onClick={() => dispatch(removeCart(product))}>
              Remove from Cart
            </Button>
          ) : (
            <Button
              disabled={!inStock}
              onClick={() => dispatch(addCart(product))}
            >
              {!inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
