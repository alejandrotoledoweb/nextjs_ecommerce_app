import store from "@/store/store";
import classNames from "classnames";
import { observer } from "mobx-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductProps {
  product: {
    description: string;
    name: string;
    image: string;
    brand: string;
    price: number;
    slug: string;
    category: string;
    countInStock: number;
    rating: number;
    numReviews: number;
  };
}

const ProductItem: React.FC<ProductProps> = observer(({ product }) => {
  const handleAddToCart = () => {
    store.addItemToCart(product);
  };
  return (
    <article
      className={classNames({
        "product--container": true,
        "product--container--dark": store.darkMode,
      })}
    >
      <Link href={`/product/${product.name}`} className='product--link'>
        <Image
          src={product.image}
          alt={product.name}
          width='300'
          height='300'
          className='product--image'
        />
      </Link>
      <section className='product--description'>
        <Link href={`/product/${product.name}`} className='product--link'>
          <h4>{product.name}</h4>
        </Link>
        <dl className='product--details'>
          <dt>{product.brand}</dt>
          <dd>$ {product.price}</dd>
        </dl>
        <button className='product--button' type='button' onClick={handleAddToCart}>
          Add to cart
        </button>
      </section>
    </article>
  );
});

export default ProductItem;
