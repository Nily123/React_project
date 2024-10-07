import React, { useEffect, useState } from 'react';
import './back.css';

// 小時對應的本地影片文件
const videoMap = {
  '00': '../public/back/00.mp4',   // 替換成本地0點對應的影片文件
  '01': '../public/back/01.mp4',   // 替換成本地1點對應的影片文件
  '02': '../public/back/02.mp4',
  '03': '../public/back/03.mp4',
  '04': '../public/back/04.mp4',
  '05': '../public/back/05.mp4',
  '06': '../public/back/06.mp4',
  '07': '../public/back/07.mp4',
  '08': '../public/back/08.mp4',
  '09': '../public/back/09.mp4',
  '10': '../public/back/10.mp4',   // 依此類推...
  '11': '../public/back/11.mp4',
  '12': '../public/back/12.mp4',
  '13': '../public/back/13.mp4',
  '14': '../public/back/14.mp4',
  '15': '../public/back/15.mp4',
  '16': '../public/back/16.mp4',
  '17': '../public/back/17.mp4',
  '18': '../public/back/18.mp4',
  '19': '../public/back/19.mp4',
  '20': '../public/back/20.mp4',
  '21': '../public/back/21.mp4',
  '22': '../public/back/22.mp4',
  '23': '../public/back/23.mp4'    // 替換成23點對應的影片文件
};

function BackgroundVideo() {
  const [videoSrc, setVideoSrc] = useState('');

  // Helper function：根據當前時間獲取對應的影片源
  const getVideoSrc = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // 獲取當前小時，並轉換成 2 位數字格式
    return videoMap[hours] || videoMap['00'];  // 根據小時回傳對應的影片源，預設回傳午夜的影片
  };

  useEffect(() => {
    // 初次加載時設置影片
    setVideoSrc(getVideoSrc());

    // 每小時更換一次影片
    const intervalId = setInterval(() => {
      setVideoSrc(getVideoSrc());  // 更新影片源
    }, 60 * 60 * 1000);  // 每小時更新一次影片

    return () => clearInterval(intervalId);  // 清除定時器，防止記憶體洩漏
  }, []);

  return (
    <video
      id="background-video"
      autoPlay
      muted
      loop
      playsInline
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1
      }}
      src={videoSrc}
    >
      您的瀏覽器不支持 video 標籤。
    </video>
  );
}

export default BackgroundVideo;
