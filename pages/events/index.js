import Layout from "@/components/Layout";
import styles from "@/styles/Layout.module.css";
import { API_URL } from "@/config/index";

import axios from "axios";
import EventItem from "@/components/EventItem";
import PaginationComponent from "@/components/PaginationComponent";

function EventsPage({ data, total, page }) {
  return (
    <Layout>
      <h1> All Events </h1>
      <div className={styles.container}>
        {data.map((evt) => (
          <EventItem key={evt.id} evt={evt.attributes} />
        ))}
      </div>
      <PaginationComponent total={total} page={page} />
    </Layout>
  );
}

export default EventsPage;

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  // Calculate the start page
  const startValue = +page === 1 ? 0 : (+page - 1) * 2;

  let data, total;
  await axios
    .get(
      `${API_URL}/events?populate=image&pagination[limit]=${2}&pagination[start]=${startValue}&pagination[withCount]=true`
    )
    .then((res) => {
      data = res.data.data;
      total = res.data.meta.pagination.total;
    });

  return {
    props: { data, total, page },
  };
};
