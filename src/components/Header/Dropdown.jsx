import { Dropdown, Button, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeCart } from '../../store/cartSlice';
import { useState } from 'react';

function CartDropdown() {
    const cartList = useSelector((state) => state.cartState.cartList);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    return (
        <Dropdown
            align="end"
            className="mt-auto"
            show={open}
            onToggle={() => setOpen(!open)}
        >
            <Dropdown.Toggle variant="success" className="d-flex align-items-center">
                <FaShoppingCart fontSize="20px" />
                <Badge bg="light" text="dark" className="ms-2">
                    {cartList.length}
                </Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu className="p-2 bg-warning overflow-hidden" style={{ minWidth: 350 }}>
                {cartList.length > 0 ? (
                    <>
                        {/* Go to Cart Button */}
                        <Link to="/cart" onClick={() => setOpen(false)} className="text-decoration-none">
                            <Button
                                variant="primary"
                                className="w-100 mb-2"
                            >
                                Go to Cart
                            </Button>
                        </Link>

                        {/* Cart Items */}
                        {cartList.map((prod) => (
                            <div
                                key={prod.id}
                                className="hover-card d-flex align-items-center p-2 mb-2 shadow-sm rounded"
                                style={{ background: "#ffffff" }}
                            >
                                {/* Image */}
                                <img
                                    src={prod.image}
                                    alt={prod.name}
                                    className="rounded-circle me-2"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover",
                                    }}
                                />

                                {/* Product Info */}
                                <div className="flex-grow-1">
                                    <div className="fw-bold">{prod.name}</div>
                                    <div className="text-muted">${parseInt(prod.price)}</div>
                                </div>

                                {/* Delete Icon */}
                                <AiFillDelete
                                    className="text-danger fs-4 ms-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => dispatch(removeCart(prod))}
                                />
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="text-center p-3">Cart is Empty!</div>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default CartDropdown;
