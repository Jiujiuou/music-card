import styles from "./index.module.less";
import Header from "@/components/Header";

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <div className={styles.preview}></div>
        <div className={styles.control}></div>
      </div>
    </div>
  );
}

export default App;
