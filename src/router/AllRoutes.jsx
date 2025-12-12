import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Cart from '../pages/Cart'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import ProtectedRoute from '../features/auth/ProtectedRoute'

function AllRouter() {
  return (
    <>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}

export default AllRouter