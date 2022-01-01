import Head from "next/head";

function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title> {title} </title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      {children}
    </div>
  );
}

Layout.defaultProps = {
  title: "DJ events | Find the hottest parties",
  description: "Define the latest and other musical events",
  keywords: "music, dj, edm, events",
};

export default Layout;
