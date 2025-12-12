import { useTitle } from '../hooks/useTitle'
import { Container } from 'react-bootstrap'
import CartCard from '../components/CartCard'
import { useSelector } from 'react-redux'


function Cart() {
  useTitle('Cart')

  const cartList = useSelector((state) => state.cartState.cartList)
  const total = useSelector((state) => state.cartState.total)

  return (
    <main className='py-4'>
      <Container>

        {/* Cart Heading SAME width as CartCard */}
        <div className="row sticky-cart-header">
          <div className="col-lg-9 col-md-10 col-sm-12 mx-auto">
            <div className="bg-success text-white  border border-dark border-2 rounded-3 p-3 mb-3">
              <h4 className="text-center fw-bold m-0">
                Cart Items ({cartList.length}) — Total: ${total}
              </h4>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        {cartList.length > 0 ? (
          <div className="row">
            <div className="col-lg-9 col-md-10 col-sm-12 mx-auto">
              <CartCard />
            </div>
          </div>
        ) : (
          <div className="text-center mt-5 ">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              style={{ width: '150px', marginBottom: '20px' }}
            />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything to your cart yet.</p>
          </div>
        )}

      </Container>
    </main>

  )
}

export default Cart