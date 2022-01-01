import Head from "next/head";
import Header from "./Header";

import styles from "../styles/Layout.module.css";
import Footer from "./Footer";

function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title> {title} </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "DJ events | Find the hottest parties",
  description: "Define the latest and other musical events",
  keywords: "music, dj, edm, events",
};

export default Layout;
