import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import data from "@/utils/data";
import ProductItem from "@/components/product-item";
import { observer } from "mobx-react";
import classNames from "classnames";
import store from "@/store/store";
import { ProductInterface } from "@/utils/interfaces";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async () => {
  const response = await fetch("http:localhost:3000/api/products");
  const products = await response.json();
  return {
    props: {
      products,
    },
  };
};

interface HomeProps {
  products: ProductInterface[];
}

const Home: React.FC<HomeProps> = observer(({ products }) => {
  return (
    <Layout>
      <main
        className={classNames(`${inter.className}`, { home: true, "home--dark": store.darkMode })}
      >
        <section className='home--products'>
          {products.map(product => (
            <ProductItem product={product} key={product.name}></ProductItem>
          ))}
        </section>
      </main>
    </Layout>
  );
});

export default Home;
