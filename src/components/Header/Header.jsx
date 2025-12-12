import { Navbar, Container, Button } from 'react-bootstrap';
import Logo from './Logo';
import SearchBar from './SearchBar';
import CartDropdown from './Dropdown';
import { IoFilter } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { filterToggle } from '../../store/filterSlice';
import { logout } from '../../features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state) => state.auth?.token);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar sticky="top" bg="dark" variant="dark" className="d-flex justify-content-center align-items-center">
      <Container fluid className='d-flex flex-column flex-md-row' >

        {/* ALWAYS SHOW LOGO */}
        <div className="mb-2 p-2 mb-md-0 d-flex justify-content-between align-items-center w-100 w-md-50">
          <Logo />
          {/* ===================== LOGGED IN VIEW ===================== */}

          {!isAuthPage && token && (<i className="d-md-none mt-3"><CartDropdown /></i>)}

          {/* DESKTOP: Search Bar + Filter */}
          {!isAuthPage && token && (
            <>
              <div className="flex-grow-1 w-100 d-none d-md-block">
                <span className='d-flex'><SearchBar />
                  {location.pathname !== "/cart" && (
                    <Button
                      variant="outline-light"
                      className="d-none d-md-block"
                      onClick={() => dispatch(filterToggle())}
                    >
                      <span className="d-flex align-items-center gap-1"><IoFilter /> Filter</span>
                    </Button>
                  )}
                </span>

              </div>

              {/* LOGOUT BUTTON */}
              <div className='d-none d-md-block' >
                <span className="d-flex align-items-center gap-2">
                  <CartDropdown />
                  <Button
                    variant="outline-light"
                    className=""
                    onClick={handleLogout}
                  >
                    Logout
                  </Button></span>
              </div>

            </>)}
        </div>

        {/* ===================== Mobile VIEW ===================== */}
        {!isAuthPage && token && (
          <>
            {/* MOBILE: SearchBar + Logout + Filter in one row */}
            <div className="d-flex w-100 d-md-none align-items-center gap-2 mb-2">

              {/* Search bar takes full remaining space */}
              <div className="flex-grow-1">
                <SearchBar />
              </div>

              {/* Filter button auto-size */}
              {location.pathname !== "/cart" && (
                <Button variant="outline-light" onClick={() => dispatch(filterToggle())}>
                  <IoFilter className="me-1" /> Filter
                </Button>
              )}

              {/* Logout button auto-size */}
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
