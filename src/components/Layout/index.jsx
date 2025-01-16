import styles from "./index.module.less";
import Header from "@/components/Header";
import Card from "@/components/Card";
import ImageUpload from "@/components/ImageUpload";
import useStore from "@/store";

function Layout() {
  const { 
    updateBackgroundUrl, 
    updateCardImageUrl, 
    updateSongName,
    updateArtist,
    updateDuration,
    updateCurrentTime,
  } = useStore();

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
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="请输入歌曲名称"
              onChange={(e) => updateSongName(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="请输入演唱者"
              onChange={(e) => updateArtist(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="请输入音乐时长（例如：03:30）"
              onChange={(e) => updateDuration(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="请输入已播放时长（例如：01:30）"
              onChange={(e) => updateCurrentTime(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
