import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


function AdminProductsPage(props) {

    const history = useHistory();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo || !userInfo.isAdmin && props.history.push("/");
    });

    async function deleteHandler(id) {
        await axios.delete(`http://localhost:5000/products/${id}`);
        window.location.reload();

    }

    useEffect(() => {

        async function getProducts() {
            const { data } = await axios.get("http://localhost:5000/products");
            setProducts(data);
            console.log(products);
        }
        getProducts();
    }, [setProducts])

    return <div>
        <h1 className="products-header text-light btn-dark p-4 text-center mb-0">Products Page</h1>
        <a href="/add-product"> <button className="btn btn-dark btn-outline-danger btn-block p-3 mt-5 product-button">  Add Product  </button> </a>

        <div className="container ms-auto me-auto mt-3">
            <div className="row">

                {products && products.map(product => {

                    return <div className="col">

                        <div className="card mt-4 bg-dark text-light text-center mb-4" style={{ width: "18rem", borderRadius: "5%" }}>
                            <img src={product.image} className="card-img-top" style={{ height: "13rem", borderRadius: "5%" }} alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="/" className="btn btn-outline-primary text-light w-100">NGN {(product.price).toLocaleString(undefined, {maximumFractionDigits:2})}</a>

                                <div className="d-flex mt-2 justify-content-between">
                                    <a href={`/edit-product/${product._id}`}> <button className="btn btn-primary">Edit</button> </a>
                                    <button onClick={() => deleteHandler(product._id)} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    </div>
}

export default AdminProductsPage;