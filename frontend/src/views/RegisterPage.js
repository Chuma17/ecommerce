import { useEffect, useState } from "react";
import axios from 'axios';

function RegisterPage(props) {

  const [email, setEmail] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    userInfo && props.history.push("/");
  });

  async function submitHandler(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const url = "http://localhost:5000/users/register";
    const { data } = await axios.post(url, { email, firstName, lastName, password });

    setError(data.error);
    setSuccess(data.success);
  }

  return <div><>

    <section className="background-radial-gradient overflow-hidden">

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

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="password" id="form3Example4" maxLength={20} minLength={4} value={password} onChange={e => setPassword(e.target.value)} required className="form-control" />
                        <label className="form-label" htmlfor="form3Example4">Password</label>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="form-outline mb-4">
                        <input type="password" id="form3Example4" maxLength={20} minLength={4} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="form-control" />
                        <label className="form-label" htmlfor="form3Example5">Confirm Password</label>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-dark btn-outline-danger btn-block mb-4">
                    Sign up
                  </button>

                  <p className="mb-2 pb-lg-2 text-center">Already have an account? <a href="/login"
                    style={{ color: '#393f81' }}>Login here</a></p>

                  <div className="text-center">
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-github"></i>
                    </button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


  </>

  </div>
}

export default RegisterPage;