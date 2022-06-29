import { useEffect, useState } from "react";
import axios from 'axios';


function CheckoutPage(props) {

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [state, setState] = useState("");

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        !userInfo && props.history.push("/");
    });

    async function submitHandler(e) {
        e.preventDefault();

        const url = "http://localhost:5000/users/register";
        const { data } = await axios.post(url, { firstName });

        setError(data.error);
        setSuccess(data.success);
    }

    return <>
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
            <div className="row gx-lg-5 align-items-center mb-4">

                <div className="col-lg-8 mb-5 ms-auto me-auto mb-lg-0 position-relative">
                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                    <div className="card bg-glass">
                        <div className="card-body px-4 py-5 px-md-5">

                            <form className="form" onSubmit={submitHandler}>

                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}

                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <input type="text" id="form3Example1" maxLength={15} value={firstName} onChange={e => setFirstname(e.target.value)} required className="form-control" />
                                            <label className="form-label" htmlfor="form3Example1">First name</label>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <input type="text" id="form3Example2" maxLength={15} value={lastName} onChange={e => setLastname(e.target.value)} required className="form-control" />
                                            <label className="form-label" htmlfor="form3Example2">Last name</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3" value={email} onChange={e => setEmail(e.target.value)} required className="form-control" />
                                    <label className="form-label" htmlfor="form3Example3">Email address</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3" value={state} onChange={e => setState(e.target.value)} required className="form-control" />
                                    <label className="form-label" htmlfor="form3Example3">State</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="form3Example3" value={address} onChange={e => setAddress(e.target.value)} required className="form-control" />
                                    <label className="form-label" htmlfor="form3Example3">Home address</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="number" id="form3Example3" minLength={11} maxLength={11} value={number} onChange={e => setNumber(e.target.value)} required className="form-control" />
                                    <label className="form-label" htmlfor="form3Example3">Phone Number</label>
                                </div>



                                <button type="submit" className="btn btn-dark btn-outline-danger btn-block mb-4">
                                    Proceed To Payment
                                </button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
}

export default CheckoutPage;