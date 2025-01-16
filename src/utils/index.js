import { toCanvas } from "html-to-image";
import download from "downloadjs";
import { FILA_NAME } from "@/constants";
// 将时间字符串转换为秒数
export const timeToSeconds = (timeStr) => {
  const [minutes, seconds] = timeStr.split(":").map(Number);
  return minutes * 60 + seconds;
};

// 将秒数转换为时间字符串
export const secondsToTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const downloadImage = async (downloadAreaId) => {
  const element = document.getElementById(downloadAreaId); // 替换为你的预览区域的 ID

  const rect = element.getBoundingClientRect();
  const scaleFactor = 1; // 放大倍数，用于导出高清图
  const width = rect.width * scaleFactor;
  const height = rect.height * scaleFactor;

  toCanvas(element, {
    width: width, // 宽度
    height: height, // 高度
    pixelRatio: scaleFactor, // 确保高清导出
    style: {
      margin: "0", // 清除可能影响画布的外边距
      padding: "0", // 清除内边距
      border: "none", // 清除边框
      transform: `scale(${scaleFactor})`, // 避免继承页面上的缩放
      transformOrigin: "top left", // 确保绘制起点正确
    },
  }).then((canvas) => {
    const dataUrl = canvas.toDataURL("image/png");
    download(dataUrl, FILA_NAME);
  });
};
