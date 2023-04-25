import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import data from "@/utils/data";
import ProductItem from "@/components/product-item";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <main className={`home ${inter.className}`}>
        <section className='home--products'>
          {data.products.map(product => (
            <ProductItem product={product} key={product.name}></ProductItem>
          ))}
        </section>
      </main>
    </Layout>
  );
}
