const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { use } = require("express/lib/application");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Category = require("./models/category");
const path = require("path");


const app = express();
app.use(express.json());
app.use(cors());

//USER ROUTES

//ADD A NEW USER

app.post("/users/register", async function (req, res) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        res.send({ error: "This email has already been used" });
        return;
    }

    const newUser = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        isAdmin: false
    });

    await newUser.save();
    res.send({ success: "User saved successfully" });
})

//LOGIN WITH A USER

app.post("/users/login", async function (req, res) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
        res.send({ error: "User does not exist" });
        return;
    }
    if (existingUser.password !== req.body.password) {
        res.send({ error: "Password is incorrect" });
        return
    }
    res.send({ user: existingUser });
    console.log({ user: existingUser })
})


//UPDATE USER ACCOUNT

app.put("/users/:id", async (req, res) => {

    const user = await User.findById(req.params.id)

    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.password = req.body.password || user.password

    const updatedUser = await user.save();
    res.send(updatedUser);
})

//PRODUCTS ROUTES

//ADD A PRODUCT
app.post("/products", async function (req, res) {

    const newProduct = new Product({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        categoryId: req.body.category
    });

    await newProduct.save();
    console.log("Product saved successfully");
    res.send({ success: "Product saved successfully" });
});

// SEARCH / GET ALL PRODUCTS
app.get("/products", async function (req, res) {
    const name = req.query.name || "";
    const nameFilter = { name: { $regex: name, $options: 'i' } };
    const products = await Product.find({ ...nameFilter });
    res.send(products);
})

//DELETE A PRODUCT
app.delete("/products/:id", async function (req, res) {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    await product.deleteOne();
})

//GET A SINGLE PRODUCT
app.get("/products/:id", async function (req, res) {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
        res.send(product);
    }
    else {
        console.log("Product was not found");
    }
})

//UPDATE A SINGLE PRODUCT
app.put("/products/:id", async function (req, res) {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
        product.name = req.body.name;
        product.image = req.body.image;
        product.price = req.body.price;
        await product.save();
        res.send({ success: "Product updated successfully" })
    }

    else {
        console.log("Product was not found");
    }
})



//CATEGORY ROUTE

//ADD A CATEGORY
app.post("/categories", async function (req, res) {    
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
        res.send({ error: "This category has already been added" })
        return;
    }

    const newCategory = new Category({
        name: req.body.name
    });

    await newCategory.save();
    res.send({ success: "Category created successfully" });
});


//GET ALL CATEGORIES
app.get("/categories", async function (req, res) {
    const categories = await Category.find();
    res.send(categories);
})


//DELETE A CATEGORY
app.delete("/categories/:id", async function (req, res) {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    await category.deleteOne();
})


//GET A SINGLE CATEGORY
app.get("/categories/:id", async function (req, res) {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (category) {
        res.send(category);
    }
    else {
        console.log("Category was not found");
    }
})


//UPDATE A SINGLE CATEGORY
app.put("/categories/:id", async function (req, res) {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (category) {
        category.name = req.body.name;
        await category.save();
        res.send({ success: "Category updated successfully" })
    }

    else {
        console.log("Category was not found");
    }
})


//GET ALL PRODUCTS IN A CATEGORY

app.get("/category-products/:id", async (req, res) => {
    const products = await Product.find({categoryId : req.params.id})
    res.send(products);
})


//GET SUMMARY
app.get("/summary", async (req, res) => {
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();
    const categoryCount = await Category.countDocuments();

    res.send({productCount, userCount, categoryCount});
    console.log({productCount, userCount, categoryCount});
})

// const mongodbURL = "mongodb://localhost/ecommerce"
const mongodbURL = "mongodb+srv://Chuma:barryallen@dreamchasers.lwar18o.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongodbURL)
    .then(result => console.log("Mongodb connected"))
    .catch(err => console.log(err))

const __dirnames = path.resolve();
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(process.env.PORT || 5000, () => {
    console.log("App is running on port 5000")
});