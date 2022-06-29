import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
function Loginpage(props) {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        userInfo && props.history.push("/");
        
    });

    async function submitHandler(e) {
        e.preventDefault();
        const { data } = await axios.post("http://localhost:5000/users/login", { email, password });
        data.error && setError(data.error);
        if (data.user) {
            localStorage.setItem("userInfo", JSON.stringify(data.user));
            history.push("/")
            window.location.reload();
            
        }
    }

    return <div>

        <section className="vh-110 background-radial-gradient">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">

                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                        alt="login form" className="img-fluid h-100" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form className="form" onSubmit={submitHandler}>

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                <span className="h1 fw-bold mb-0">Dreamchasers</span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                                            {error && <div className="alert alert-danger">{error}</div>}

                                            <div className="form-outline mb-4">
                                                <input  type="email" value={email} onChange={e => setEmail(e.target.value)} required className="form-control form-control-lg" />
                                                <label className="form-label" htmlfor="form2Example17">Email address</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input  type="password" value={password} onChange={e => setPassword(e.target.value)} required className="form-control form-control-lg" />
                                                <label className="form-label" htmlfor="form2Example27">Password</label>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-dark btn-outline-danger btn-block" type="submit">Login</button>
                                            </div>

                                            <div className="">
                                                <a className="small text-muted" href="#!">Forgot password?</a>
                                                <p className="mb-4 pb-lg-2">Don't have an account? <a href="/register"
                                                    style={{ color: '#393f81' }}>Register here</a></p>
                                                <a href="/about" className="small text-muted">Terms of use</a><br />
                                                <a href="/privacy" className="small text-muted">Privacy policy</a>
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
    
    </div >

}
export default Loginpage;

