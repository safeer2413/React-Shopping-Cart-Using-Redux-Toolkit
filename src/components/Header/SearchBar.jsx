import { FormControl, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { filterBySearch } from '../../store/filterSlice';

function SearchBar() {
    const dispatch = useDispatch();
    return (
        <div className="d-flex d-sm-flex d-md-flex w-25 justify-content-center">
            <Col xs={10} sm={8} md={10}>
                <FormControl
                    type="text"
                    placeholder="🔍 Search a Product"
                    className="mx-auto"
                    onChange={(e) => dispatch(filterBySearch(e.target.value))}
                />
            </Col>
        </div>
    )
}

export default SearchBar
