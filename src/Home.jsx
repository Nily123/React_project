import React, { useState, useEffect } from "react";
import './Home.css';

function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect 用來設置定時器，讓時間每秒更新一次
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // 清理定時器，避免記憶體洩漏
    return () => clearInterval(intervalId);
  }, []);

  // 格式化日期
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份是 0-11，須加 1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 格式化時間（24 小時制）
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="clock-container">
      {/* 顯示日期 */}
      <div className="date">{formatDate(currentTime)}</div>

      {/* 顯示時間 */}
      <div className="time">{formatTime(currentTime)}</div>
    </div>
  );
}

export default Home;


