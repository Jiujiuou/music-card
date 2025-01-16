import styles from "./index.module.less";
import Header from "@/components/Header";
import Card from "@/components/Card";
import ImageUpload from "@/components/ImageUpload";
import useStore from "@/store";

function Layout() {
  const { updateBackgroundUrl, updateCardImageUrl } = useStore();

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <div className={styles.preview}>
          <Card />
        </div>
        <div className={styles.control}>
          <ImageUpload 
            title="上传背景图片" 
            onUpload={updateBackgroundUrl} 
          />
          <ImageUpload 
            title="上传卡片图片" 
            onUpload={updateCardImageUrl} 
          />
        </div>
      </div>
    </div>
  );
}

export default Layout;
