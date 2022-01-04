import styles from "@/styles/EventItem.module.css";
import Image from "next/image";
import Link from "next/link";
function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt ? evt.image : "images/event-default.png"}
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          {" "}
          {evt.date} as {evt.time}{" "}
        </span>
        <h3> {evt.name} </h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.slug}`}>
          <a className="btn"> View </a>
        </Link>
      </div>
    </div>
  );
}

export default EventItem;
