import { Dropdown, Button, Badge } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { goToCart, removeCart } from '../../store/cartSlice'

function CartDropdown() {
    const cartList = useSelector((state) => state.cartState.cartList)
    const dispatch = useDispatch()

    return (
        <Dropdown align="end" className="mt-md-0 mt-3">
            <Dropdown.Toggle variant="success" className="d-flex align-items-center">
                <FaShoppingCart fontSize="20px" />
                <Badge bg="light" text="dark" className="ms-2">
                    {cartList.length}
                </Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu className="cartList" style={{ minWidth: 350 }}>
                {cartList.length > 0 ? (
                    <>
                        <Link to="/cart">
                            <Button
                                variant="primary"
                                style={{
                                    width: '90%',
                                    margin: '10px auto',
                                    display: 'block',
                                }}
                            >
                                Go to Cart
                            </Button>
                        </Link>

                        {cartList.map((prod) => (
                            <span
                                className="cartItem d-flex align-items-center px-2"
                                key={prod.id}
                            >
                                <img
                                    src={prod.image}
                                    alt={prod.name}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                        marginRight: 10,
                                    }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div>{prod.name}</div>
                                    <div>$ {parseInt(prod.price)}</div>
                                </div>
                                <AiFillDelete
                                    style={{ cursor: 'pointer', color: 'red' }}
                                    onClick={() => dispatch(removeCart(prod))}
                                />
                            </span>
                        ))}
                    </>
                ) : (
                    <span className="p-3 text-center">Cart is Empty!</span>
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CartDropdown
