import "./App.css"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import CartPage from "./views/CartPage";
import AboutPage from "./views/AboutPage";
import PrivacyPage from "./views/PrivacyPage";
import ContactPage from "./views/ContactPage";
import AdminProductsPage from "./views/AdminProductsPage";
import AddProductPage from "./views/AddProductPage";
import ProductPage from "./views/ProductPage";
import EditProductPage from "./views/EditProductPage";
import Footer from "./components/Footer";
import AccountPage from "./views/AccountPage";
import CheckoutPage from "./views/CheckoutPage";
import AddCategoryPage from "./views/AddCategoryPage";
import EditCategoryPage from "./views/EditCategoryPage";
import AdminCategoryPage from "./views/AdminCategoryPage";
import ResultPage from "./views/ResultPage";
import DashboardPage from "./views/DashboardPage";
import CategoryResultPage from "./views/CategoryResultPage";


function App() {
    return <Router>

        <Header />
        <Switch>
            <main>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/cart/:id?" component={CartPage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/privacy" component={PrivacyPage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/admin-products" component={AdminProductsPage} />
                <Route path="/add-product" component={AddProductPage} />
                <Route path="/product/:id" component={ProductPage} />
                <Route path="/category-products/:id" component={CategoryResultPage} />
                <Route path="/edit-product/:id" component={EditProductPage} />
                <Route path="/account/:id" component={AccountPage} />
                <Route path="/checkout" component={CheckoutPage} />
                <Route path="/admin-categories" component={AdminCategoryPage} />
                <Route path="/edit-category/:id" component={EditCategoryPage} />
                <Route path="/add-category" component={AddCategoryPage} />
                <Route path="/search/:name" component={ResultPage} />
                <Route path="/admin-dashboard" component={DashboardPage} />
            </main>
        </Switch>
        <Footer />
    </Router>
}

export default App;