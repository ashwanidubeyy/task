import React, { useRef, useState } from 'react';
import '../css/DatePicker.css'; // Import the CSS file

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const ref = useRef();

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="date-picker-container">
      <input
      type="text"
      placeholder='Pick a date'
      ref={ref}
      id='datepick'
      value={selectedDate}
      className='input-date'
      onChange={handleDateChange}
      onFocus={() => (ref.current.type = "date")}
        onBlur={() => (ref.current.type = "text")}
    />
      
    </div>
  );
}

export default DatePicker;

