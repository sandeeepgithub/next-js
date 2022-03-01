import Layout from "@/components/Layout";
import styles from "@/styles/Layout.module.css";
import { API_URL } from "@/config/index";

import axios from "axios";
import EventItem from "@/components/EventItem";
import Link from "next/link";
import qs from "qs";
import { useRouter } from "next/router";

function SearchPage({ data }) {
  const router = useRouter();

  return (
    <Layout title="Search results">
      <Link href="/events">Go back</Link>
      <h1> Search Results for {router.query.term}: </h1>
      <div className={styles.container}>
        {data.length === 0 && <h3> No events found </h3>}
        {data.map((evt) => (
          <EventItem key={evt.id} evt={evt.attributes} />
        ))}
      </div>
    </Layout>
  );
}

export default SearchPage;

export const getServerSideProps = async ({ query: { term } }) => {
  let data;

  const query = qs.stringify(
    {
      filters: {
        $or: [
          { name: { $contains: term } },
          { performers: { $contains: term } },
          { description: { $contains: term } },
          { venue: { $contains: term } },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  await axios.get(`${API_URL}/events?${query}&populate=image`).then((res) => {
    data = res.data.data;
  });

  return {
    props: { data },
  };
};
