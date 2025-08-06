import { Button, Form } from 'react-bootstrap'
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, filterFastDelivery, filterRating, filterStock, sortByPrice } from '../store/filterSlice';

function Filter() {
    const { sort, byStock, byFastDelivery, byRating } = useSelector(state => state.filterState);
    const dispatch = useDispatch();

    return (
        <div className='filters'>
            <strong className="title">Filter Products</strong>
            <span>
                <Form.Check
                    inline
                    label='Accending'
                    name='group1'
                    type='radio'
                    id={`inline-1`}
                    checked={sort === "asc"}
                    onChange={() => dispatch(sortByPrice("asc"))}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label='Decending'
                    name='group1'
                    type='radio'
                    id={`inline-2`}
                    checked={sort === "desc"}
                    onChange={() => dispatch(sortByPrice("desc"))}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label='In Stock Products'
                    name='group1'
                    type='checkbox'
                    id={`inline-3`}
                    onChange={() => dispatch(filterStock())}
                    checked={byStock}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label='Fast Delivery Only'
                    name='group1'
                    type='checkbox'
                    id={`inline-4`}
                    checked={byFastDelivery}
                    onChange={() => dispatch(filterFastDelivery())}
                />
            </span>
            <span>
                <label style={{ paddingRight: 10 }}>Rating:</label>
                <Rating
                    rating={byRating}
                    onClick={(i) => dispatch(filterRating(i))}
                    style={{ cursor: 'pointer' }} />
            </span>
            <Button onClick={() => dispatch(clearFilters())} variant='light'>Clear Filters</Button>
        </div>
    )
}

export default Filter