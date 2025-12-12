import { useTitle } from '../hooks/useTitle';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import Filter from '../components/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { MdProductionQuantityLimits } from "react-icons/md";
import { filterToggle } from '../store/filterSlice';

function Home() {

    useTitle("Home");

    const filterVisible = useSelector((state) => state.filterState.filterShow)
    const filterState = useSelector(state => state.filterState);
    const dispatch = useDispatch();

    const filteredProducts = products
        .filter(prod => filterState.byStock ? prod.inStock : true)
        .filter(prod => filterState.byFastDelivery ? prod.fastDelivery : true)
        .filter(prod => filterState.byRating ? prod.rating === filterState.byRating : true)
        .filter(prod => prod.name.toLowerCase().includes(filterState.searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (filterState.sort === "asc") return a.price - b.price;
            if (filterState.sort === "desc") return b.price - a.price;
            return 0;
        });

    return (

        <main>
            <section className="container-fluid bg-warning">
                <div className="row position-relative">

                    {/* BACKGROUND OVERLAY */}
                    {filterVisible && (
                        <div
                            className="overlay-bg"
                            onClick={() => dispatch(filterToggle())}
                        ></div>
                    )}

                    {/* Filter Section */}
                    <div className={`filter-wrapper position-fixed ${filterVisible ? "show" : "hide"}`}>
                        <Filter onApply={() => dispatch(filterToggle())} />
                    </div>

                    {/* PRODUCTS SECTION */}
                    {filteredProducts.length === 0 ? (
                        <div className={`col-12 d-flex justify-content-center align-items-center`} style={{ minHeight: "90vh" }}>
                            <div className="text-center p-4 border rounded shadow-sm" style={{ maxWidth: "350px" }}>
                                <MdProductionQuantityLimits size={60} className="mb-3 text-muted" />
                                <h5 className="fw-bold text-muted">No Products Found</h5>
                                <p className="text-secondary">Try adjusting your filters or search query.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="col-12">
                            <div className="row">
                                {filteredProducts.map((product) => (
                                    <div
                                        className="col-lg-3 col-md-4 col-sm-6 mb-4"
                                        key={product.id}
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}



                </div>
            </section>
        </main>

    )
}

export default Home