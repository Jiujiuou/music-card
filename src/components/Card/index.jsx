import styles from "./index.module.less";
import { useState, useRef } from "react";
import Pause from "@/assets/image/pause.svg";
import Prev from "@/assets/image/Prev.svg";
import Next from "@/assets/image/Next.svg";
import volumeLow from "@/assets/image/volumeLow.svg";
import volumeHigh from "@/assets/image/volumeHigh.svg";

const totalTime = "5:00";

// 将时间字符串转换为秒数
const timeToSeconds = (timeStr) => {
  const [minutes, seconds] = timeStr.split(":").map(Number);
  return minutes * 60 + seconds;
};

// 将秒数转换为时间字符串
const secondsToTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

function Card() {
  const totalSeconds = timeToSeconds(totalTime);
  const progressRef = useRef(null);
  const [currentSeconds, setCurrentSeconds] = useState(100);
  const [volume, setVolume] = useState(80); // 音量默认80%

  // 计算左侧时间和剩余时间
  const currentTime = secondsToTime(currentSeconds);
  const leftTime = `-${secondsToTime(totalSeconds - currentSeconds)}`;
  const progressPercentage = (currentSeconds / totalSeconds) * 100;

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <img
          className={styles.img}
          src="https://sns-webpic-qc.xhscdn.com/202501151143/f07afa91f628b8dd462b9c3954260124/1040g2sg317vgptf83u6g5pgp0mi3cqhl9dqsc90!nd_dft_wlteh_webp_3"
          alt=""
        />
        <div className={styles.title}>是的 我有见过我的梦</div>
        <div className={styles.author}>安溥 anpu</div>
        <div className={styles.progressBar}>
          <div ref={progressRef} className={styles.progress}>
            <div
              className={styles.progressIndicator}
              style={{ width: `${progressPercentage}%` }}
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
            <div className={styles.volumeProgress}>
              <div
                className={styles.volumeIndicator}
                style={{ width: `${volume}%` }}
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
