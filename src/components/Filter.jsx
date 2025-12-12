import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearFilters,
    filterFastDelivery,
    filterRating,
    filterStock,
    sortByPrice
} from '../store/filterSlice';

function Filter({ onApply }) {
    const { sort, byStock, byFastDelivery, byRating } = useSelector(state => state.filterState);
    const dispatch = useDispatch();

    // TEMP STATES (local UI-only)
    const [tempSort, setTempSort] = useState(sort);
    const [tempStock, setTempStock] = useState(byStock);
    const [tempFast, setTempFast] = useState(byFastDelivery);
    const [tempRating, setTempRating] = useState(byRating);

    // Sync temp state when menu opens
    useEffect(() => {
        setTempSort(sort);
        setTempStock(byStock);
        setTempFast(byFastDelivery);
        setTempRating(byRating);
    }, [sort, byStock, byFastDelivery, byRating]);

    const applyFilters = () => {
        if (tempSort) dispatch(sortByPrice(tempSort));
        if (tempStock !== byStock) dispatch(filterStock());
        if (tempFast !== byFastDelivery) dispatch(filterFastDelivery());
        if (tempRating !== byRating) dispatch(filterRating(tempRating));
    };

    return (
        <div className='filters'>
            <strong className="title">Filter Products</strong>

            <span>
                <Form.Check
                    inline
                    label='Ascending'
                    type='radio'
                    name='sort'
                    checked={tempSort === "asc"}
                    onChange={() => setTempSort("asc")}
                />
            </span>

            <span>
                <Form.Check
                    inline
                    label='Descending'
                    type='radio'
                    name='sort'
                    checked={tempSort === "desc"}
                    onChange={() => setTempSort("desc")}
                />
            </span>

            <span>
                <Form.Check
                    inline
                    label='In Stock Products'
                    type='checkbox'
                    checked={tempStock}
                    onChange={() => setTempStock(!tempStock)}
                />
            </span>

            <span>
                <Form.Check
                    inline
                    label='Fast Delivery Only'
                    type='checkbox'
                    checked={tempFast}
                    onChange={() => setTempFast(!tempFast)}
                />
            </span>

            <span>
                <label style={{ paddingRight: 10 }}>Rating:</label>
                <Rating
                    rating={tempRating}
                    onClick={(i) => setTempRating(i)}
                    style={{ cursor: 'pointer' }}
                />
            </span>

            {/* APPLY FILTER BUTTON */}
            <Button className="mt-2 w-75 mx-auto" onClick={() => {
                applyFilters();
                onApply(); // closes filter
            }} variant="primary">
                Apply
            </Button>


            {/* CLEAR ALL */}
            <Button
                className="mt-2 w-75 mx-auto"
                onClick={() => {
                    setTempSort("");
                    setTempStock(false);
                    setTempFast(false);
                    setTempRating(0);
                    dispatch(clearFilters());
                }}
                variant="light"
            >
                Clear Filters
            </Button>
        </div>
    );
}

export default Filter;
