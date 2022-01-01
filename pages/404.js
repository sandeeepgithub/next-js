import Link from "next/link";
import { FaExclamation } from "react-icons/fa";

import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";

function NotFoundPage() {
  return (
    <Layout title="Page not found">
      <div className={styles.error}>
        <h1>
          {" "}
          <FaExclamation /> 404{" "}
        </h1>
        <h4> Sorry there is nothing here </h4>
        <Link href="/"> Go back home</Link>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
