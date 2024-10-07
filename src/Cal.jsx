import './Cal.css';
import React, { useState, useEffect } from 'react';

function Cal({ onDateChange, selectedDate }) {
  const [currYear, setCurrYear] = useState(selectedDate.getFullYear());
  const [currMonth, setCurrMonth] = useState(selectedDate.getMonth());
  const [busyDays, setBusyDays] = useState({}); // 繁忙程度（假設從後端獲取）

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December",
  ];


  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

    let days = [];

    // 上個月的日期
    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(<li key={`prev-${i}`} className="inactive">{lastDateOfLastMonth - i + 1}</li>);
    }
    const date = new Date();
    // 本月的日期
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday = 
        i === selectedDate.getDate() && currMonth === selectedDate.getMonth() && currYear === selectedDate.getFullYear() ? "active" : "";

      const Today = 
        i === date.getDate()&& currMonth === date.getMonth() && currYear === date.getFullYear() ? "today" : "";

      days.push(
        <li key={`current-${i}`} className={isToday} id={Today}  onClick={() => onDateChange(new Date(currYear, currMonth, i))}>
          {i}
          
        </li>
      );
    }
      // 下個月的日期 (補齊剩餘的天數，直到週六)
  const totalDaysInCalendar = days.length;
  const daysInWeek = 7;
  const remainingDays = daysInWeek - (totalDaysInCalendar % daysInWeek);

  for (let i = 1; i <= remainingDays && remainingDays < 7; i++) {
    days.push(<li key={`next-${i}`} className="inactive">{i}</li>);
  }

    return days;
  };

  const handlePrevNextClick = (direction) => {
    let newMonth = currMonth + (direction === "prev" ? -1 : 1);
    let newYear = currYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setCurrMonth(newMonth);
    setCurrYear(newYear);
  };

  return (
    <div className="wrapper">
      <header>
        <p className="current-date">
          {months[currMonth]} {currYear}
        </p>
        <div className="icons">
          <span id="prev" onClick={() => handlePrevNextClick("prev")}>{"<"}</span>
          <span id="next" onClick={() => handlePrevNextClick("next")}>{">"}</span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days">{renderCalendar()}</ul>
      </div>
    </div>
  );
}

export default Cal;

