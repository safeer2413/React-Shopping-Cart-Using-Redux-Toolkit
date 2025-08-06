import { Link } from 'react-router-dom'

function Logo() {
    return (
        <Link to="/" className="d-flex align-items-center navbar-brand text-light text-decoration-none">
            <img
                src="https://img.freepik.com/premium-photo/red-shopping-cart-with-red-plastic-shopping-cart-it_1103290-111872.jpg"
                alt="Shopmate Logo"
                style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
            />
            <span>Shopping Cart</span>
        </Link>
    )
}

export default Logo
