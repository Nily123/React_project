import { useState } from 'react';
import './Card.css';
import cardImage from '../public/card.jpg';  // 假設圖片放在 assets 文件夾

const results = ['大凶', '小凶','凶', '吉', '小吉','中吉', '大吉'];

function Card() {
  const [paused, setPaused] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(null);  // 用來記錄被翻轉的圖片索引
  const [selectedResult, setSelectedResult] = useState('');  // 顯示的抽籤結果

  // 點擊圖片時觸發
  const handleItemClick = (index) => {
    setPaused(true);  // 點擊後暫停動畫
    setFlippedIndex(index);  // 設置翻轉的圖片
    setSelectedResult(results[index]);  // 根據卡片索引顯示對應的結果
  };

  // 點擊重置按鈕，恢復旋轉動畫和圖片狀態
  const handleReset = () => {
    setPaused(false);  // 恢復旋轉動畫
    setFlippedIndex(null);  // 清空翻轉的圖片，恢復初始狀態
    setSelectedResult('');  // 清空結果
  };

  return (
    <>
      <div className='banner'>
        {/* 角落的重置按鈕 */}
        <button className="reset-button" onClick={handleReset}>重新抽牌</button>

        <div className={`slider ${paused ? 'paused' : ''}`} style={{ "--quantity": 7 }}>
          {[1, 2, 3, 4, 5, 6 , 7].map((_, index) => (
            <div 
              key={index} 
              className={`item ${flippedIndex === index ? 'flipped' : ''}`} 
              style={{ "--position": index + 1 }}
              onClick={() => handleItemClick(index)}  // 點擊事件
            >
              <img src={cardImage} alt="card" />
            </div>
          ))}
        </div>
      </div>
       {/* 抽籤結果顯示區域 */}
       {selectedResult && (
        <div className="result-text">
          您抽到的是：<strong>{selectedResult}</strong>
        </div>
      )}
    </>
  );
}

export default Card;
