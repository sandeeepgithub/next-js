import styles from "@/styles/EventItem.module.css";
import Image from "next/image";
function EventItem({ evt }) {
  return (
    <div className={styles.container}>
      <Image
        src={evt ? evt.image : "images/event-default.png"}
        width={170}
        height={150}
      />
    </div>
  );
}

export default EventItem;
