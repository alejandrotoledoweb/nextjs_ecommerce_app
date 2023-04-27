import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import data from "@/utils/data";
import ProductItem from "@/components/product-item";
import { observer } from "mobx-react";
import classNames from "classnames";
import store from "@/store/store";

const inter = Inter({ subsets: ["latin"] });

const Home = observer(() => {
  return (
    <Layout>
      <main
        className={classNames(`${inter.className}`, { home: true, "home--dark": store.darkMode })}
      >
        <section className='home--products'>
          {data.products.map(product => (
            <ProductItem product={product} key={product.name}></ProductItem>
          ))}
        </section>
      </main>
    </Layout>
  );
});

export default Home;
