import axios from "axios";
import { useEffect, useState } from "react";

function HomePage(params) {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        async function getProducts() {
            const { data } = await axios.get("http://localhost:5000/products");

            setProducts(data);

            console.log(products);
        }

        getProducts();


    }, [setProducts])

    return <div>
        <h1 className="products-header text-light btn-dark p-4 text-center mb-0">Home</h1>

        <div className="container ms-auto me-auto mt-3">
            <div className="row">

                {products && products.map(product => {

                    return <div className="col">

                        <div className="card mt-4 mb-4 bg-dark text-light" style={{ width: "18rem" }}>
                            <a href={`/product/${product._id}`}> <img src={product.image} className="card-img-top" style={{ height: "13rem" }} alt="..." /> </a>
                            <div className="card-body text-center">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href={`/product/${product._id}`} className="btn btn-outline-primary mb-2 w-100">NGN {(product.price).toLocaleString(undefined, {maximumFractionDigits:2})}</a>
                                <a href={`/cart/${product._id}`} className="btn btn-danger align-items-center w-100">Add To Cart</a>

                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    </div>

}

export default HomePage;