import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function EditCategoryPage(props) {

    const [name, setName] = useState("");

    const categoryId = props.match.params.id;

    const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo && props.history.push("/");
    });

    async function getCategory(categoryId) {
        const { data } = await axios.get(`http://localhost:5000/categories/${categoryId}`);
        setName(data.name);
    }

    useEffect(() => {
        getCategory(categoryId);
    }, [categoryId])


    async function submitHandler(e) {
        const { data } = await axios.put(`http://localhost:5000/categories/${categoryId}`, { name })
        
        if (data.success) {
            history.push("/admin-categories");
            window.location.reload();
        }

    }

    return <>        

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

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Edit Category</h5>
                                            
                                            <div className="form-floating form-outline mb-4 form-floating">
                                                <input type="text" maxLength={14} value={name} onChange={e => setName(e.target.value)} className="form-control form-control-lg" />
                                                <label className="form-label" htmlfor="form2Example27">Category Name</label>
                                            </div>                                            

                                            <div className="pt-1 mb-3 text-center">
                                                <button className="btn btn-dark btn-outline-danger btn-block" type="submit">Edit</button>
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

    </>
}

export default EditCategoryPage;