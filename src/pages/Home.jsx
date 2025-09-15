import { useTitle } from '../hooks/useTitle';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import Filter from '../components/Filter';
import { useSelector } from 'react-redux';
import { MdProductionQuantityLimits } from "react-icons/md";

function Home() {

    useTitle("Home");

    const filterVisible = useSelector((state) => state.filterState.filterShow)
    const filterState = useSelector(state => state.filterState);

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
            <section className="container-fluid">
                <div className="row position-relative">
                    {/* Filter Section (always mounted, but animated using CSS) */}
                    <div className={`filter-wrapper col-lg-3  col-sm-4 ${filterVisible ? 'show' : 'hide'}`}>
                        <Filter />
                    </div>

                    {/* Product Section adjusts width based on filterVisible */}
                    {filteredProducts.length === 0 ? (
                        <div className={`${filterVisible ? 'col-lg-9 col-sm-8' : 'col-12'} d-flex justify-content-center align-items-center`} style={{ minHeight: "90vh" }}>
                            <div className="text-center p-4 border rounded shadow-sm" style={{ maxWidth: "350px" }}>
                                <MdProductionQuantityLimits size={60} className="mb-3 text-muted" />
                                <h5 className="fw-bold text-muted">No Products Found</h5>
                                <p className="text-secondary">Try adjusting your filters or search query.</p>
                            </div>
                        </div>
                    ) : (
                        <div className={`${filterVisible ? 'col-lg-9 col-sm-8' : 'col-12'}`}>
                            <div className="row">
                                {filteredProducts.map((product) => (
                                    <div
                                        className={`${filterVisible
                                            ? 'col-lg-4 col-sm-6 mb-4'
                                            : 'col-lg-3 col-md-4 col-sm-6 mb-4'
                                            }`}
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