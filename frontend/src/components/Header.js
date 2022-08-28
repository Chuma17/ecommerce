import { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";

export default function Header(props) {

  //variables

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  let [categories, setCategories] = useState([]);
  let [categoryCounter, setCategoryCounter] = useState([]);
  let [open, setOpen] = useState("");

  const [name, setName] = useState("");

  const history = useHistory();


  // logout function
  function LogoutHandler() {
    if (window.confirm("Confirm logout")) {
      localStorage.removeItem("userInfo");
      props.history.push("/login")
    }
  }

  //search function
  function clickHandler(e) {
    e.preventDefault();
    history.push(`/search/${name}`)
    window.location.reload();
  }


  //category counter
  useEffect(() => {
    async function getSummary() {
      const { data } = await axios.get("http://localhost:5000/summary");
      setCategoryCounter(data.categoryCount)
    }
    getSummary();
  }, [setCategoryCounter])


  //category display
  useEffect(() => {
    async function getCategories() {
      const { data } = await axios.get("http://localhost:5000/categories");
      setCategories(data);
      console.log(categories);
    }
    getCategories();
  }, [setCategories])


  return <div className="header">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3 fixed-top">
      <div class="container-fluid">

        <i onClick={() => setOpen(!open)} className="category-icon fs-4 fa fa-bars text-light me-4 p-2"></i>


        <a class="navbar-brand fs-3" href="/"> <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i> Dreamchasers</a>

        <button class="navbar-toggler" onClick={() => setOpen(false)} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <form class="d-flex ms-auto mb-3 mt-3">
            <input value={name} onChange={e => setName(e.target.value)} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button onClick={clickHandler} class="btn btn-outline-danger me-2" type="submit"><i className="fa fa-search"></i></button>
          </form>

          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

            {!userInfo && <li class="nav-item m-auto">
              <a class="nav-link navbar-link active" aria-current="page" href="/login"> <i class="fa-solid fa-arrow-right-to-bracket"></i> Login</a>
            </li>}

            {userInfo && <li class="nav-item btn-outline-danger acct-name p-1 m-auto">
              <a class="nav-link active " aria-current="page" href={`/account/${userInfo._id}`}> <i className="fas fa-user"></i> {userInfo && userInfo.firstName}</a>
            </li>}

            {!userInfo && <li class="nav-item m-auto">
              <a class="nav-link navbar-link active" href="/register"> <i className="fas fa-pen"></i> SignUp</a>
            </li>}

            {!userInfo && <li class="nav-item dropdown m-auto">
              <a class="nav-link navbar-link active dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                More
              </a>
              <ul class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item text-light" href="/about"> <i class="fa fa-circle-info"></i> About</a></li>
                <li><a class="dropdown-item text-light" href="/privacy"> <i class="fa-solid fa-shield"></i> Privacy</a></li>
                <li><hr class="dropdown-divider text-light" /></li>
                <li><a class="dropdown-item text-light" href="/contact"> <i class="fa-solid fa-address-book"></i> Contact Us</a></li>
              </ul>
            </li>}

            {userInfo && <li class="nav-item dropdown m-auto">
              <a class="nav-link navbar-link active dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                More
              </a>
              <ul class="dropdown-menu bg-dark text-light" aria-labelledby="navbarDropdown">

                <li><a class="dropdown-item text-light" href="/admin-products"> <i class="fa-solid fa-box"></i> Products</a></li>
                <li><a class="dropdown-item text-light" href="/admin-categories"> <i class="fa-solid fa-box-archive"></i> Categories</a></li>
                <li><a class="dropdown-item text-light" href="/admin-dashboard"> <i class="fa-solid fa-clipboard-list"></i> Dashboard</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item text-light" href="/about"> <i class="fa fa-circle-info"></i> About</a></li>
                <li><a class="dropdown-item text-light" href="/privacy"> <i class="fa-solid fa-shield"></i> Privacy</a></li>
                <li><a class="dropdown-item text-light" href="/contact"> <i class="fa-solid fa-address-book"></i> Contact Us</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a href="/" class="dropdown-item text-light" onClick={LogoutHandler}> <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a></li>

              </ul>
            </li>}

            <li class="nav-item m-auto">
              <a class="nav-link navbar-link active" href="/cart"> <i className="fas fa-shopping-cart fs-5"></i>
                {cartItems && <span className="cart-count btn-outline-danger text-light ms-1">{cartItems.length} </span>}</a>
            </li>

          </ul>

        </div>

      </div>
    </nav>

    {open && <div className="category-sidebar bg-dark p-2 pe-3 pt-3">

      {userInfo && <h3 className="btn-block"> <a href="/admin-categories" className="btn btn-outline-danger p-3 mb-3">Categories [{categoryCounter}]</a> </h3>}
      {!userInfo && <h3 className="btn btn-outline-danger disabled fs-4 p-3 mb-3 btn-block">Categories [{categoryCounter}]</h3>}

      {categories && categories.map(category => {

        return <a key={category._id} className="p-2 mb-2" href={`/category-products/${category._id}`}>{category.name}</a>

      })}

      {categories === 0 && <h3>No Categories</h3>}

    </div>}

  </div>
}