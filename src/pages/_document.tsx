import store from "@/store/store";
import classNames from "classnames";
import { observer } from "mobx-react";
import { Html, Head, Main, NextScript } from "next/document";

const Document = observer(() => {
  return (
    <Html lang='en' className={classNames({ main: true, "main-dark": store.darkMode })}>
      <Head title='Nextjs E-commerce' />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
});

export default Document;
