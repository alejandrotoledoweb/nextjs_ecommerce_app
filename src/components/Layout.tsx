import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import Head from "next/head";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className=''>
      <Head>
        <title>Ecommerce NextJS</title>
      </Head>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>Ecommerce NextJS</Typography>
        </Toolbar>
      </AppBar>

      <Container>{children}</Container>
      <footer>
        <Typography variant='h6' align='center' gutterBottom>
          All rights reserved. @ATF_Store
        </Typography>
      </footer>
    </section>
  );
};

export default Layout;
