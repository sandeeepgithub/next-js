import Layout from "@/components/Layout";
import styles from "@/styles/Layout.module.css";
import { API_URL } from "@/config/index";

import axios from "axios";
import EventItem from "@/components/EventItem";

function Home({ data }) {
  console.log(data);
  return (
    <Layout>
      <div className={styles.container}>
        {data.map((evt) => (
          <EventItem key={evt.id} evt={evt} />
        ))}
      </div>
    </Layout>
  );
}

export default Home;

export const getServerSideProps = async () => {
  let data;
  await axios.get(`${API_URL}/api/events`).then((res) => {
    data = res;
  });

  return {
    props: data,
  };
};
