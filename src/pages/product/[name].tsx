import Layout from "@/components/Layout";
import Product from "@/models/Products";
import store from "@/store/store";
import { ProductInterface } from "@/utils/interfaces";
import axios from "axios";
import { observer } from "mobx-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const getServerSideProps = async (context: { params: { name: string } }) => {
  const { params } = context;
  const { name } = params;
  const product = await Product.findOne({ name }).lean();
  const parsedProduct = JSON.parse(JSON.stringify(product));
  return {
    props: {
      product: parsedProduct,
    },
  };
};

interface ProductProps {
  product: ProductInterface;
}

const ProducScreen: React.FC<ProductProps> = observer(({ product }) => {
  const addToCartHandle = async () => {
    console.log("Add to Cart");
    const { data } = await axios.get(`/api/products/${product._id}`);
    console.log(data);
    store.addItemToCart(data);
  };

  if (!product) {
    return <span>Product Not Found</span>;
  }
  return (
    <Layout title={product.name}>
      <header className='single--back'>
        <Link href='/' className='single--link'>
          Back to Home
        </Link>
      </header>
      <section className='single--container'>
        <Image
          className='single--image'
          width='440'
          height='440'
          src={product.image}
          alt={product.name}
        />
        <article className='single--details'>
          <ul>
            <li>
              {" "}
              <h1 className='single--title'>{product.name}</h1>
            </li>
            <li className='single--category'>Category: {product.category}</li>
            <li className='single--description'>Description: {product.description}</li>
            <li className='single--reviews'>
              {product.rating} rating from {product.numReviews} reviews
            </li>
          </ul>
        </article>
        <aside className='single--price'>
          <ul>
            <li>Price ${product.price}</li>
            <li>Status: {product.countInStock > 0 ? "In Stock" : "Unavailable"}</li>
          </ul>
          <button className='single--button' onClick={addToCartHandle}>
            Add to Cart
          </button>
        </aside>
      </section>
    </Layout>
  );
});

export default ProducScreen;
