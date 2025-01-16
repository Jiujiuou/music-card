import styles from "./index.module.less";
import { useId } from "react";

function ImageUpload({ title = "上传图片", onUpload }) {
  const inputId = useId();

  const handleUploadImage = () => {
    document.getElementById(inputId).click();
  };

  const handleFileChange = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const imageData = e.target.result;
      onUpload?.(imageData);
    };
  };

  return (
    <div className={styles.input} onClick={handleUploadImage}>
      {title}
      <input
        type="file"
        accept="image/*"
        className={styles.realInput}
        onChange={(e) => handleFileChange(e.target.files[0])}
        id={inputId}
      />
    </div>
  );
}

export default ImageUpload;
