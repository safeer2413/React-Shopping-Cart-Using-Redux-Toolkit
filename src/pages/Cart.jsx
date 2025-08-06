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
        <h2 className='mt-1 text-center sticky-price'>
          Cart Items ({cartList.length}) — Total: ${total}
        </h2>

        {cartList.length > 0 ? (
          <CartCard />
        ) : (
          <div className="text-center mt-5">
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