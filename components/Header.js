import Link from "next/link";
import styles from "@/styles/Header.module.css";
import Searh from "./Search";
function Header() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <a> DJ event </a>
          </Link>
        </div>
        <Searh />
        <nav>
          <ul>
            <li>
              <Link href="/events">
                <a> Events </a>
              </Link>
            </li>
            <li>
              <Link href="/events/add">
                <a> Add Event </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
