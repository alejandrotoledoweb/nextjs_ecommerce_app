import Layout from "@/components/Layout";
import data from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ProducScreen: React.FC = () => {
  const { query } = useRouter();
  const { name } = query;
  const product = data.products.find(x => x.name === name);

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
        <article className='product--details'>
          <ul>
            <li>
              {" "}
              <h1 className='single--title'>{product.name}</h1>
            </li>
            <li className='single--category'>Category: {product.category}</li>
            <li className='single--description'>Description: {product.description}</li>
            <li className='single--reviews'>
              {product.rating} of {product.numReviews} reviews
            </li>
          </ul>
        </article>
        <aside className='product--price'>
          <ul>
            <li>Price ${product.price}</li>
            <li>Status {product.countInStock > 0 ? "In Stock" : "Unavailable"}</li>
          </ul>
          <button className='single--button'>Add to Cart</button>
        </aside>
      </section>
    </Layout>
  );
};

export default ProducScreen;
