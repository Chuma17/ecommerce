import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";


function AddCategoryPage(props) {

    const [name, setName] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo || !userInfo.isAdmin && props.history.push("/");
    });

    const submitHandler = async (e) => {

        e.preventDefault();
        const { data } = await axios.post("http://localhost:5000/categories", { name })

        if (data.error) {
            setError(data.error);
        }

        if (data.success) {
            props.history.push("/admin-categories");
            window.location.reload();
        }

    }

    return <div>

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

                                            {error && <div className="alert alert-danger">{error}</div>}

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Add New Category</h5>

                                            <div className="form-outline mb-4">
                                                <input type="text" maxLength={14} value={name} onChange={e => setName(e.target.value)} required className="form-control form-control-lg" />
                                                <label className="form-label" htmlfor="form2Example27">Category Name</label>
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
        </section>


    </div>
}

export default AddCategoryPage;