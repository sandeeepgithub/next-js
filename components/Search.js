import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Search.module.css";

const Search = () => {
  const [term, setTerm] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          placeholder="Search events"
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
