import store from "@/store/store";
import { Typography, Container, Switch } from "@material-ui/core";
import classNames from "classnames";
import { observer } from "mobx-react";
import Head from "next/head";
import NextLink from "next/link";
import React, { useEffect } from "react";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = observer(({ title = "Ecommerce NextJS", children }) => {
  const handleDarkMode = () => {
    if (store.darkMode) {
      store.setDarkModeOff();
    } else {
      store.setDarkModeOn();
    }
  };

  useEffect(() => {
    const darkModeValue = localStorage.getItem("darkMode");
    store.setDarkModeValue(darkModeValue);
  }, []);

  return (
    <section
      className={classNames({
        "layout--container": true,
        "layout--container--dark": store.darkMode,
      })}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <nav
        className={classNames({ "layout--navbar": true, "layout--navbar--dark": store.darkMode })}
      >
        <NextLink href='/' passHref>
          <Typography variant='h6'>Ecommerce NextJS</Typography>
        </NextLink>
        <div className='layout--login'>
          <Switch checked={store.darkMode} onChange={handleDarkMode} color='default' />
          <NextLink href='/cart' passHref>
            <Typography variant='body2'>Cart</Typography>
          </NextLink>
          <NextLink href='/login' passHref>
            <Typography variant='body2'>Login</Typography>
          </NextLink>
        </div>
      </nav>

      <Container>{children}</Container>
      <footer>
        <Typography variant='h6' align='center' gutterBottom>
          All rights reserved. @ATF_Store
        </Typography>
      </footer>
    </section>
  );
});

export default Layout;
