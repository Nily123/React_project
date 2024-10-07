import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Nav from './Nav.jsx';
import News from './News.jsx';
import './index.css';
import Weather from './Weather.jsx';
import Calendar from './Calender.jsx';
import Card from './Card.jsx';
import Music from './Music.jsx'
import Home from './Home.jsx'
import BackgroundVideo from './BackgroundVideo.jsx'
import St from './St.jsx'

function CarouselApp() {
  const [activeNumber, setActiveNumber] = useState(3); // 放在组件内部

  return (
    <StrictMode>
      <div className="carousel" style={{ transform: `translateX(-${activeNumber * 100}vw)` }}>
        <div className="slide">
          <div className="c"><Weather/></div>
          <div className="c" ><News/></div>
          <div className="c"><St/></div>
          <div className="c_home" ><Home/></div>
          <div className="c"><Music/></div>
          <div className="c"><Calendar/></div>
          <div className="c"><Card/></div>
        </div>
      </div>
      <br />
      {/* 传递更新函数到 Nav 组件 <Music/>*/}
      <Nav changeact={setActiveNumber} />
      <BackgroundVideo/>
    </StrictMode>
  );
}

// 渲染根组件
createRoot(document.getElementById('root')).render(<CarouselApp />);
