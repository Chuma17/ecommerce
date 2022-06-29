import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";


function AddProductPage(props) {

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [price, setPrice] = useState(0);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo && props.history.push("/");
    });

    const submitHandler = async (e) => {

        setLoading(true);
        const { data } = await axios.post("http://localhost:5000/products", { name, image, price, category })
        if (data.success) {
            setLoading(false);
            props.history.push("/admin-products");
            window.location.reload();
        }
    }

    useEffect(() => {
        async function getCategories() {
            const { data } = await axios.get("http://localhost:5000/categories");
            setCategories(data);
            console.log(categories);
        }
        getCategories();
    }, [setCategories]);

    return <div>

        {loading ? <div style={{ textAlign: 'center' }}><h1>Loading....</h1> <Loading /> </div> :

            <section className="vh-110">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: '1rem' }}>
                                <div className="row g-0">

                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                            alt="login form" className="img-fluid h-100" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                    </div>




                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">


                                            <form className="form" onSubmit={submitHandler}>

                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Add New Product</h5>

                                                <div className="form-outline mb-4">
                                                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="form-control form-control-lg" />
                                                    <label className="form-label" htmlfor="form2Example27">Item Name</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="text" value={image} onChange={e => setImage(e.target.value)} required className="form-control form-control-lg" />
                                                    <label className="form-label" htmlfor="form2Example27">Item Image</label>
                                                </div>

                                                <div className="form-floating form-outline mb-4">
                                                    <input type="text" value={price} onChange={e => setPrice(e.target.value)} required className="form-control form-control-lg" />
                                                    <label className="form-label" htmlfor="form2Example27">Item Price</label>
                                                </div>

                                                <div className="mb-4">
                                                    <select value={category} onChange={e => setCategory(e.target.value)} required class="form-select form-control" aria-label="Default select example">
                                                        <option value="">--- Select Category ---</option>

                                                        {categories.length > 0 && categories.map(category => {
                                                            return <option key={category._id} value={category._id}>{category.name}</option>
                                                        })}
                                                    </select>
                                                </div>

                                                <div className="pt-1 mb-3 text-center">
                                                    <button className="btn btn-dark btn-outline-danger btn-block" type="submit">Add</button>
                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}


    </div>
}

export default AddProductPage;