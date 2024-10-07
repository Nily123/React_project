import React, { useState, useEffect } from "react";
import axios from "axios";
import './Weather.css';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null); // 保存選中的地區

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get("https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-B32D7D3A-A58C-4201-BD49-5A03F094377A&locationName=");
        
        setWeatherData(response.data.records);  // 保存 API 回傳的天氣資料
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p>載入中...</p>;
  if (error) return <p>出錯了: {error}</p>;
  if (!weatherData) return <p>無資料</p>;  // 如果 weatherData 是 null，顯示無資料

  const handleLocationClick = (location) => {
    setSelectedLocation(location); // 設置目前選中的地區
  };

  const extractTimeWithRegex = (timeStr) => {
    const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):/; // 正則匹配 YYYY-MM-DD HH
    const match = timeStr.match(regex);
  
    if (match) {
      const [, , month, date, hour] = match; // 提取年份後的月份、日期和小時
      return { month, date, hour };
    }
    return {};
  };
  
  const renderTimeWithRegex = (startTime, endTime) => {
    const { month: startMonth, date: startDate, hour: startHour } = extractTimeWithRegex(startTime);
    const { month: endMonth, date: endDate, hour: endHour } = extractTimeWithRegex(endTime);
  
    return (
      <p>
        
        {startMonth}/{startDate} {startHour}:00 
        <br/> 
        {endMonth}/{endDate} {endHour}:00
      </p>
    );
  };

  // 動態分配 classname
  const getElementClassName = (elementName) => {
    switch (elementName) {
      case 'Wx':
        return 'weather-status weatherinfo';  // 天氣狀況 class
      case 'PoP':
        return 'rain-probability weatherinfo'; // 降雨機率 class
      case 'MinT':
        return 'min-temperature weatherinfo';  // 最低溫度 class
      case 'MaxT':
        return 'max-temperature weatherinfo';  // 最高溫度 class
      case 'CI':
        return 'comfort-index weatherinfo';    // 舒適度指數 class
      default:
        return '';
    }
  };

    // 動態分配 classname
    const getElementName = (elementName) => {
      switch (elementName) {
        case 'Wx':
          return(<p className="elename">天氣狀況</p>) ;  // 天氣狀況 class
        case 'PoP':
          return (<p className="elename">降雨機率</p>); // 降雨機率 class
        case 'MinT':
          return (<p className="elename">最低溫度</p>);  // 最低溫度 class
        case 'MaxT':
          return (<p className="elename">最高溫度</p>);  // 最高溫度 class
        case 'CI':
          return (<p className="elename">舒適度指數</p>); // 舒適度指數 class
        default:
          return '';
      }
    };


  // 針對不同 elementName 進行不同的格式處理
  const renderParameter = (elementName, parameter) => {
    switch (elementName) {
      case 'PoP': // 針對降雨機率顯示百分比
        return (
          <p>
            {parameter.parameterName}%
            
          </p>
        );
      case 'MinT': // 針對最低溫度顯示攝氏度
        return (
          <p>
             {parameter.parameterName}°{parameter.parameterUnit}
          </p>
        );
      case 'MaxT': // 針對最高溫度顯示攝氏度
        return (
          <p>
            {parameter.parameterName}°{parameter.parameterUnit}
          </p>
        );
      case 'CI': // 針對舒適度顯示字串描述
        return (
          <div>
            
              <p>
                   {parameter.parameterName}
              </p>
          </div>
        );
      case 'Wx': // 針對天氣狀況顯示天氣描述
        return (
          <p>
            {parameter.parameterName}
          </p>
        );
      default:
        return <p>{parameter.parameterName}</p>;
    }
  };

  return (
    <div className="weather">
      <h1>{weatherData.datasetDescription}</h1>
      <div className="lo_div">
        <ul className="lo_ul">
          {/* 顯示地區選項 */}
          {weatherData.location && weatherData.location.map((location, locIndex) => (
            <li 
              key={locIndex} 
              className="lo_li"
              onClick={() => handleLocationClick(location)} // 點擊切換地區
              style={{ cursor: 'pointer', fontWeight: selectedLocation?.locationName === location.locationName ? 'bold' : 'normal' }}
            >
              {location.locationName}
            </li>
          ))}
        </ul>
      </div>
      {/* 只顯示選中地區的天氣資料 */}
      {selectedLocation && (
        <div className="location">

          <h2 className="city">{selectedLocation.locationName}</h2>
          {selectedLocation.weatherElement[0].time.map((ele, eleIndex) => (
              <div className="weathertime" key={eleIndex}>
                {renderTimeWithRegex(ele.startTime,ele.endTime)}
              </div>
          ))}
          
          {selectedLocation.weatherElement.map((element, elemIndex) => (
            <div key={elemIndex} className={getElementClassName(element.elementName) }>
              {getElementName(element.elementName)}
              {/*<div className="infoitem"></div>*/}
              {element.time.map((time, timeIndex) => (
                <div key={timeIndex} className="infoitem">
                 
                  {/* 根據 elementName 呼叫 renderParameter 方法 */}
                  {renderParameter(element.elementName, time.parameter)}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Weather;
