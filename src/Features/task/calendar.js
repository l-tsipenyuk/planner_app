import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const TaskCalendar = ({ onSelectDay }) => {
    const [selectedDay, setSelectedDay] = useState(null);

    const handleDay = (day) => {
        setSelectedDay(day);
        onSelectDay(day.toISOString());
    };

    return (
        <div className="calendar">
            <h1 className="header">Planner Application</h1>
            <div className="calendar-container">
                <Calendar onChange={handleDay} value={selectedDay}/>
            </div>
            
        </div>
    );
};

export default TaskCalendar;