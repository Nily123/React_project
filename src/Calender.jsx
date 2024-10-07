import React, { useState } from 'react';
import Cal from './Cal.jsx';
import ToDoList from './ToDoList.jsx';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    console.log(newDate);
  };

  return (
    <>
      {/* 行事曆 */}
      <Cal onDateChange={handleDateChange} selectedDate={selectedDate} />
      
      {/* 待辦清單 */}
      <ToDoList selectedDate={selectedDate} />
    </>
  );
}

export default Calendar;