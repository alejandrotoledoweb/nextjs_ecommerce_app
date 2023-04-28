import Layout from "@/components/Layout";
import Product from "@/models/Products";
import { ProductInterface } from "@/utils/interfaces";
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

const ProducScreen: React.FC<ProductProps> = ({ product }) => {
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
          <button className='single--button'>Add to Cart</button>
        </aside>
      </section>
    </Layout>
  );
};

export default ProducScreen;
