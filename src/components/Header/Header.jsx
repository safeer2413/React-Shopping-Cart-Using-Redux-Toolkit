import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import Logo from './Logo'
import SearchBar from './SearchBar'
import CartDropdown from './Dropdown'
import { IoFilter } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { filterToggle } from '../../store/filterSlice';
import { useLocation } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  return (<>
    <Navbar sticky="top" bg="dark" variant="dark" expand="md">
      <Container fluid className="px-3">
        <Logo />
        <SearchBar />
        {location.pathname !== "/cart" && (
          <Button onClick={() => dispatch(filterToggle())}><IoFilter style={{ marginRight: '7px' }} />Filter</Button>
        )}
        <Nav className="ms-auto mt-4 mt-md-5">
          <CartDropdown />
        </Nav>
      </Container>
    </Navbar>
  </>
  )
}

export default Header
