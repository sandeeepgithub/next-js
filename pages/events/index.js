import Layout from "@/components/Layout";
import styles from "@/styles/Layout.module.css";
import { API_URL } from "@/config/index";

import axios from "axios";
import EventItem from "@/components/EventItem";

function EventsPage({ data }) {
  return (
    <Layout>
      <h1> All Events </h1>
      <div className={styles.container}>
        {data.map((evt) => (
          <EventItem key={evt.id} evt={evt.attributes} />
        ))}
      </div>
    </Layout>
  );
}

export default EventsPage;

export const getStaticProps = async () => {
  let data;
  await axios.get(`${API_URL}/events?populate=image`).then((res) => {
    data = res.data.data;
  });

  return {
    props: { data },
  };
};
