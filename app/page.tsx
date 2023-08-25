import Image from "next/image";
import styles from "./page.module.css";
import CustomerTable from "@/components/CustomerTable";

export default function Home() {
  return (
    <div className={styles.main}>
      <CustomerTable />
    </div>
  );
}
