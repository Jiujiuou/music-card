import styles from "./index.module.less";
import { useState, useRef, useEffect } from "react";
import Pause from "@/assets/image/pause.svg";
import Prev from "@/assets/image/Prev.svg";
import Next from "@/assets/image/Next.svg";
import volumeLow from "@/assets/image/volumeLow.svg";
import volumeHigh from "@/assets/image/volumeHigh.svg";
import useStore from "@/store";
import { timeToSeconds, secondsToTime } from "@/utils";
import DefaultAlbumImg from "@/assets/image/default-album.png";

function Card() {
  const { backgroundUrl, cardImageUrl, musicInfo } = useStore();
  const totalSeconds = timeToSeconds(musicInfo.duration || "00:00");
  const progressRef = useRef(null);
  const [currentSeconds, setCurrentSeconds] = useState(timeToSeconds(musicInfo.currentTime || "00:00"));
  const [volume, setVolume] = useState(80); // 音量默认80%
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const volumeRef = useRef(null);

  useEffect(() => {
    setCurrentSeconds(timeToSeconds(musicInfo.currentTime || "00:00"));
  }, [musicInfo.currentTime]);

  // 计算左侧时间和剩余时间
  const currentTime = secondsToTime(currentSeconds);
  const leftTime = `-${secondsToTime(totalSeconds - currentSeconds)}`;
  const progressPercentage = (currentSeconds / totalSeconds) * 100;

  // 处理进度条点击
  const handleProgressClick = (e) => {
    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = offsetX / width;
    const newSeconds = Math.floor(totalSeconds * percentage);

    const startTime = currentSeconds;
    const endTime = Math.min(Math.max(0, newSeconds), totalSeconds);
    const duration = 500; // 300ms 的动画时间
    const startTimestamp = performance.now();

    const animate = (currentTimestamp) => {
      const elapsed = currentTimestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const currentTime = startTime + (endTime - startTime) * easeProgress;
      setCurrentSeconds(currentTime);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  // 处理拖拽开始
  const handleDragStart = () => {
    setIsDragging(true);
  };

  // 处理拖拽中
  const handleDrag = (e) => {
    if (!isDragging) return;

    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    const percentage = offsetX / rect.width;
    const newSeconds = Math.floor(totalSeconds * percentage);
    setCurrentSeconds(Math.min(Math.max(0, newSeconds), totalSeconds));
  };

  // 处理拖拽结束
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // 处理音量点击
  const handleVolumeClick = (e) => {
    const volumeBar = volumeRef.current;
    const rect = volumeBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = (offsetX / width) * 100;
    const newVolume = Math.min(Math.max(0, percentage), 100);

    const startVolume = volume;
    const endVolume = newVolume;
    const duration = 500;
    const startTimestamp = performance.now();

    const animate = (currentTimestamp) => {
      const elapsed = currentTimestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // 使用 easeOutCubic 缓动函数
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const currentVolume =
        startVolume + (endVolume - startVolume) * easeProgress;
      setVolume(currentVolume);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  // 处理音量拖拽开始
  const handleVolumeDragStart = () => {
    setIsDraggingVolume(true);
  };

  // 处理音量拖拽中
  const handleVolumeDrag = (e) => {
    if (!isDraggingVolume) return;

    const volumeBar = volumeRef.current;
    const rect = volumeBar.getBoundingClientRect();
    const offsetX = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    const percentage = (offsetX / rect.width) * 100;
    setVolume(Math.min(Math.max(0, percentage), 100));
  };

  // 处理音量拖拽结束
  const handleVolumeDragEnd = () => {
    setIsDraggingVolume(false);
  };

  // 添加全局鼠标事件监听
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      handleDrag(e);
    };

    const handleGlobalMouseUp = () => {
      handleDragEnd();
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging]);

  // 添加全局鼠标事件监听（音量）
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      handleVolumeDrag(e);
    };

    const handleGlobalMouseUp = () => {
      handleVolumeDragEnd();
    };

    if (isDraggingVolume) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDraggingVolume]);

  return (
    <div
      className={styles.background}
      style={
        backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : undefined
      }
    >
      <div className={styles.card}>
        <img
          className={styles.img}
          src={cardImageUrl || DefaultAlbumImg}
          alt=""
        />
        <div className={styles.title}>{musicInfo.name || "未知歌曲"}</div>
        <div className={styles.author}>{musicInfo.artist || "未知歌手"}</div>
        <div className={styles.progressBar}>
          <div
            ref={progressRef}
            className={styles.progress}
            onClick={handleProgressClick}
          >
            <div
              className={styles.progressIndicator}
              style={{ width: `${progressPercentage}%` }}
              onMouseDown={handleDragStart}
            />
          </div>
          <div className={styles.timeInfo}>
            <div className={styles.currentTime}>{currentTime}</div>
            <div className={styles.leftTime}>{leftTime}</div>
          </div>
        </div>
        <div className={styles.control}>
          <img src={Prev} alt="" className={styles.icon} />
          <img src={Pause} alt="" className={styles.icon} />
          <img src={Next} alt="" className={styles.icon} />
        </div>
        <div className={styles.volume}>
          <img src={volumeLow} alt="" className={styles.volumeIcon} />
          <div className={styles.volumeBar}>
            <div
              ref={volumeRef}
              className={styles.volumeProgress}
              onClick={handleVolumeClick}
            >
              <div
                className={styles.volumeIndicator}
                style={{ width: `${volume}%` }}
                onMouseDown={handleVolumeDragStart}
              />
            </div>
          </div>
          <img src={volumeHigh} alt="" className={styles.volumeIcon} />
        </div>
      </div>
    </div>
  );
}

export default Card;
