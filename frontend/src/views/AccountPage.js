import axios from "axios";
import { useEffect, useState } from "react";


function AccountPage(props) {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userId = userInfo._id;

    const [email] = useState(userInfo.email);
    const [firstName, setFirstName] = useState(userInfo.firstName);
    const [lastName, setLastName] = useState(userInfo.lastName);
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    const submitHandler = async (e) => {

        e.preventDefault();

        if (password !== userInfo.password) {
            setError("Wrong Password");
            return;
        }

        const { data } = await axios.put(`http://localhost:5000/users/${userInfo._id}`, { firstName, lastName, password });
        localStorage.setItem("useInfo", JSON.stringify(data));

        setSuccess("Account Updated");
        setError("");

        props.history.push("/");
        window.location.reload();

        return;
    }

    return <>

        <section className="vh-110" >
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

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Edit User Account</h5>

                                            {error && <div className="alert alert-danger">{error}</div>}
                                            {success && <div className="alert alert-success">{success}</div>}

                                            <div className="form-outline mb-4 form-floating">
                                                <input type="email" value={email} className="form-control form-control-lg" />
                                                <label className="form-label" htmlfor="form2Example27">Email address</label>
                                            </div>

                                            <div className="form-floating form-outline mb-4">
                                                <input type="text" maxLength={12} value={firstName} onChange={e => setFirstName(e.target.value)} required className="form-control form-control-lg" />
                                                <label className="form-label" htmlfor="form2Example27">First Name</label>
                                            </div>

                                            <div className="form-floating form-outline mb-4">
                                                <input type="text" maxLength={12} value={lastName} onChange={e => setLastName(e.target.value)} required className="form-control form-control-lg" />
                                                <label className="form-label" htmlfor="form2Example27">Last Name</label>
                                            </div>

                                            <div className="form-outline w-50 mb-4">
                                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="form-control form-control-lg" />
                                                <label className="form-label" htmlfor="form2Example27">Password</label>
                                            </div>

                                            <div className="pt-1 mb-3 text-center">
                                                <button className="btn btn-outline-danger btn-dark btn-block" type="submit">Edit</button>
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

export default AccountPage;