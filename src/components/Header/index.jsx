import styles from "./index.module.less";
import { downloadImage } from "@/utils";

function Header() {
  const download = (id) => {
    downloadImage(id);
  };
  return (
    <div className={styles.header}>
      <div className={styles.name}>Jiujiu-Tool</div>
      <div className={styles.actions}>
        <div className={styles.button} onClick={() => download("background")}>
          下载大图
        </div>
        <div className={styles.button} onClick={() => download("card")}>
          下载卡片
        </div>
      </div>
    </div>
  );
}

export default Header;
