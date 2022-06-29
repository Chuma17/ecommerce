import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const DashboardPage = (props) => {

const [products, setProducts] = useState(0);
const [categories, setCategories] = useState(0);
const [users, setUsers] = useState(0);

useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    !userInfo && props.history.push("/");
});

//orders
let qty = 1;
let prodId = props.match.params.id;
let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

const addToCart = async (prodId, qty) => {
    const { data } = await axios.get(`http://localhost:5000/products/${prodId}`);
    let item = {
        _id: data._id,
        name: data.name,
        price: data.price,
        image: data.image,
        qty
    }

    let existingItem = cartItems.find(x => x._id === item._id);

    if (existingItem) {
        cartItems = cartItems.map(x => x._id === existingItem._id ? item : x)
    }

    else {
        cartItems = [...cartItems, item];
    }


    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

useEffect(() => {
    if (prodId) {
        addToCart(prodId, qty);
    }
}, [prodId]);


async function getSummary() {
    const { data } = await axios.get("http://localhost:5000/summary");
    setProducts(data.productCount)
    setCategories(data.categoryCount)
    setUsers(data.userCount)
}

useEffect(() => {
    getSummary();
}, [])

    return <>

        <div className="container dashboard">
            <div className="row">

                <div className="col">
                    <div class="card mb-4 mt-4 text-center text-light bg-danger" style={{width: "30rem", height: "15rem"}}>                        
                        <div class="card-body ">
                            <h1 class="card-title"><i className="fa fa-shopping-cart"></i></h1>
                            <h3 class="card-text">Products</h3>
                            <h3 class="card-text">{products}</h3>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div class="card mb-4 mt-4 text-center text-light bg-primary" style={{width: "30rem", height: "15rem"}}>                        
                        <div class="card-body">
                            <h1 class="card-title"><i className="fa fa-list"></i></h1>
                            <h3 class="card-text">Categories</h3>
                            <h3 class="card-text">{categories}</h3>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div class="card mb-4 mt-4 text-center text-light bg-success" style={{width: "30rem", height: "15rem"}}>                        
                        <div class="card-body">
                            <h1 class="card-title"><i className="fa fa-users"></i></h1>
                            <h3 class="card-text">Users</h3>
                            <h3 class="card-text">{users}</h3>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div class="card mb-4 mt-4 text-center bg-warning" style={{width: "30rem", height: "15rem"}}>                        
                        <div class="card-body">
                            <h1 class="card-title"><i className="fa fa-money-bill"></i></h1>
                            <h3 class="card-text">Orders ({cartItems.reduce((a, c) => a + Number(c.qty), 0)})</h3> 
                            <h3 class="card-text">₦ {(cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default DashboardPage;