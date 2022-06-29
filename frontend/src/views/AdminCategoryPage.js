import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


function AdminCategoryPage(props) {

    const history = useHistory();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo && props.history.push("/");
    });

    async function deleteHandler(id) {
        window.location.reload();
        await axios.delete(`http://localhost:5000/categories/${id}`);

    }

    useEffect(() => {

        async function getCategories() {
            const { data } = await axios.get("http://localhost:5000/categories");
            setCategories(data);
            console.log(categories);
        }
        getCategories();
    }, [setCategories])

    return <div>
        <h1 className="products-header text-light btn-dark p-4 text-center mb-0">Category Page</h1>

        <a href="/add-category"> <button className="btn btn-dark btn-outline-danger btn-block p-3 mt-5 product-button">  Add Category  </button> </a>

        {categories.length === 0 ? <div className="d-flex justify-content-between alert alert-primary mb-4 mt-4 p-4">No Categories</div>
            :

            <div className="container ms-auto me-auto mt-3">
                <div className="row">


                    {categories.map(category => {

                        return <div className="col">

                            <div className="card mt-4 bg-dark text-light text-center mb-4" style={{ width: "14rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title fs-4 mb-4">{category.name}</h5>
                                    <a href={`/category-products/${category._id}`} className="btn btn-outline-danger text-light w-100">View Products</a>

                                    <div className="d-flex mt-2 justify-content-between">
                                        <a href={`/edit-category/${category._id}`}> <button className="btn btn-primary">Edit</button> </a>
                                        <button onClick={() => deleteHandler(category._id)} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}


                </div>

            </div>
        }
    </div>

}

export default AdminCategoryPage;