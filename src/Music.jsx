import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForwardStep, faBackwardStep, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import './Music.css';
import MusicVisualizer from './MusicVisualizer.jsx';

function Music() {
  const [songs, setSongs] = useState([
    { name: "Cookie Run OST", src: "../public/Cookie Run Oven Break OST.mp3" },
    { name: "FNF vs Impostor OST", src: "../public/FNF vs Impostor OST .mp3" },
    { name: "FNF vs Sarvente OST", src: "../public/FNF-Sarvente's Mid-Fight .mp3" }
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);  // 默認音量為 1 (最大)
  const [currentTime, setCurrentTime] = useState(0); // 追蹤當前播放時間
  const [duration, setDuration] = useState(0); // 追蹤歌曲總時長
  const audioRef = useRef(null);  // 參考音頻元素
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleLoadedMetadata = () => setDuration(audio.duration);
      const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
      
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [currentSongIndex]);

  const handleIconClick = () => {
    setIsHovered(!isHovered); // 切換 range 顯示狀態
  };

  // 播放/暫停切換
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 下一首
  const nextSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(true);  // 切換到下一首自動播放
  };

  // 上一首
  const prevSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  };

  const changsong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  // 音量調整
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // 進度條拖動
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // 上傳歌曲
  const handleUpload = (event) => {
    const files = event.target.files;
    const newSongs = Array.from(files).map((file) => ({
      name: file.name,
      src: URL.createObjectURL(file)
    }));
    setSongs([...songs, ...newSongs]);
  };

  return (
    <div className="music-player">
      <h2>音樂播放器</h2>
      <div ><img src='../public/song.png' className={`pic ${isPlaying ? 'roll' : ''}`}></img></div>
      <p className='song_name'>{songs[currentSongIndex].name}</p>

      <audio
        ref={audioRef}
        src={songs[currentSongIndex].src}
        onEnded={nextSong}  // 當歌曲結束，自動切換到下一首
        autoPlay={isPlaying}
        controls={false}
      />

      <button onClick={togglePlayPause} className="ic_p">
        {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
      </button>

      <button onClick={prevSong} className="ic_f"><FontAwesomeIcon icon={faBackwardStep} /></button>
      <button onClick={nextSong} className="ic_b"><FontAwesomeIcon icon={faForwardStep} /></button>

      {/* 音量調整 */}
      <div className="volume-control" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <p className="ic_v" onClick={handleIconClick}>
          <FontAwesomeIcon icon={faVolumeHigh} />
        </p>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className={`volume ${isHovered ? 'show' : ''}`}
        />
      </div>

      {/* 上傳歌曲 */}
      <div className ='upload'>
        <label htmlFor="upload">上傳音樂文件: </label>
        <input
          type="file"
          id="upload"
          accept="audio/*"
          onChange={handleUpload}
          multiple
        />
      </div>

      {/* 顯示播放列表 */}
      <ul>
        {songs.map((song, index) => (
          <li key={index} onClick={() => changsong(index)} className={currentSongIndex === index && 'playing'}>
            {song.name}
          </li>
        ))}
      </ul>

      {/* 播放進度條 */}
      <div className="progress-bar">
      <p className='start_time'>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</p>
        <input
          type="range"
          min="0"
          max={duration || 0}  // 避免 NaN 問題
          value={currentTime}
          onChange={handleSeek}
          className='song_time'
        />
        
        <p className='end_time'>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</p>
      </div>
      <MusicVisualizer audioRef={audioRef} />
    </div>
  );
}

export default Music;
