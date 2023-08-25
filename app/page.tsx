import styles from "./page.module.css";
import CustomerTable from "@/components/CustomerTable";

export default function Home() {
  return (
    <div className={styles.main}>
      <h1 style={{ textAlign: "center" }}>Capsuit Customers List</h1>
      {/* Importing Table Components */}
      <CustomerTable />
    </div>
  );
}
