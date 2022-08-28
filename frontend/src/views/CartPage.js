import axios from "axios";
import { useEffect } from "react";


const CartPage = (props) => {
    let prodId = props.match.params.id;
    let qty = 1;

    let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const delCart = () => {
        localStorage.removeItem("cartItems");
        window.location.reload();
    }

    const deleteItemHandler = (id) => {
        cartItems = cartItems.filter(x => x._id !== id);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        window.location.reload();
    }

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
        props.history.push("/cart");
        window.location.reload();
    }

    useEffect(() => {
        if (prodId) {
            addToCart(prodId, qty);
        }
    }, [prodId]);


    return <>

        <section className="h-100 gradient-custom">
            <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">3
                        <div className="card mb-4">
                            <div className="card-header py-3 d-flex justify-content-between">
                                <h5 className="mb-0 fs-4">Cart - {cartItems && cartItems.length} {cartItems.length === 1 && <span>item</span>} {cartItems.length > 1 && <span>items</span>}
                                </h5>
                                <button onClick={delCart} className="btn btn-dark btn-outline-danger">Empty Cart</button>
                            </div>

                            {cartItems.length === 0 ? <div className="d-flex justify-content-between alert alert-primary mb-4 mt-4 p-4">No Item in Cart<a href="/">Add From Home</a></div>
                                :
                                <div className="card-body">
                                    {cartItems.map(item => {

                                        return <div className="row">

                                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                    <img src={item.image}
                                                        className="w-100" alt="Image Item" />
                                                    <a href="#!">
                                                        <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                <p className="fs-4"><strong>{item.name}</strong></p>
                                                <p><strong>Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae magnam sint, deleniti ut</strong></p>
                                                <button type="button" onClick={() => deleteItemHandler(item._id)} className="btn btn-danger btn-sm mt-2 me-1"
                                                    data-mdb-toggle="tooltip" title="Remove item">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>

                                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                <label className="form-label" >Quantity</label>

                                                <div className="d-flex mb-4">

                                                    <div className="form-outline input-group mb-3">
                                                        <select value={item.qty} onChange={(e) => addToCart(item._id, e.target.value)} class="custom-select form-control" id="form1">
                                                            {[...Array(100).keys()].map(x => {
                                                                return <option key={x} value={x + 1}>{x + 1}</option>
                                                            })}
                                                        </select>
                                                    </div>

                                                </div>
                                                <p className="text-start text-md-center fs-5">
                                                    <strong>₦{(item.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
                                                </p>
                                            </div>

                                            <hr className="my-4" />
                                            <hr className="my-4" />

                                        </div>
                                    })}

                                </div>
                            }
                        </div>

                        <div className="card mb-4 mb-lg-0">
                            <div className="card-body">
                                <p><strong>We accept</strong></p>
                                <img className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                    alt="Visa" />
                                <img className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                    alt="American Express" />
                                <img className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                    alt="Mastercard" />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="d-flex justify-content-between card-header py-3">
                                <h5 className="mb-0">Summary</h5>
                                <h5 className="mb-0">-</h5>
                                <h5 className="mb-0">SubTotal</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li
                                        className="fs-5 list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        <strong>Total Products</strong>
                                        <span className="fs-5"><strong>{cartItems.reduce((a, c) => a + Number(c.qty), 0)}</strong></span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        Shipping
                                        <span>Gratis</span>
                                    </li>
                                    <li
                                        className="fs-5 list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Total amount</strong>
                                            <strong>
                                                <p className="mb-0">(including VAT)</p>
                                            </strong>
                                        </div>
                                        <span><strong>₦{(cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong></span>
                                    </li>
                                </ul>

                                <a href="/checkout"> <button type="button" className="btn btn-dark btn-outline-danger btn-block">
                                    Go to checkout
                                </button> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>


}

export default CartPage;