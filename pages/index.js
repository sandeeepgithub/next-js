import Layout from "@/components/Layout";
import styles from "@/styles/Layout.module.css";
import { API_URL } from "@/config/index";

import axios from "axios";
import EventItem from "@/components/EventItem";
import Link from "next/link";

function EventsPage({ data }) {
  return (
    <Layout>
      <h1> Events </h1>
      <div className={styles.container}>
        {data.map((evt) => (
          <EventItem key={evt.id} evt={evt.attributes} />
        ))}
      </div>
      <Link href="/events">
        <a className="btn-secondary"> View all events </a>
      </Link>
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
