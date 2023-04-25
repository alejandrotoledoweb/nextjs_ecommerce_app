import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductProps {
  product: { description: string; name: string; image: string; brand: string; price: number };
}

const ProductItem: React.FC<ProductProps> = ({ product }) => {
  return (
    <article className='product'>
      <Link href={`/product/${product.description}`} className='product--link'>
        <Image
          src={product.image}
          alt={product.name}
          width='300'
          height='300'
          className='product--image'
        />
      </Link>
      <section className='product--description'>
        <Link href={`/product/${product.description}`} className='product--link'>
          <h4>{product.name}</h4>
        </Link>
        <dl className='product--details'>
          <dt>{product.brand}</dt>
          <dd>$ {product.price}</dd>
        </dl>
        <button className='product--button' type='button'>
          Add to cart
        </button>
      </section>
    </article>
  );
};

export default ProductItem;
