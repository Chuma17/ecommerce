import axios from "axios";
import { useEffect, useState } from "react";

function ProductPage(props) {
    const productId = props.match.params.id;
    const [product, setProduct] = useState("");

    async function getProduct(productId) {
        const { data } = await axios.get(`http://localhost:5000/products/${productId}`);
        setProduct(data);
        console.log(data)
    }

    useEffect(() => {
        getProduct(productId);
    }, [productId])

    return <>
        <div className="product-page">

            {product && <>
                <img src={product.image} alt="" />

                <div className="product-details text-light">
                    <h1>{product.name}</h1>
                    <h3>NGN {product.price}</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis similique minima adipisci eveniet, doloremque at.</p>
                </div>
            </>}

        </div>
    </>
}

export default ProductPage;