import React, { useState } from "react";
import TaskCalendar from './calendar';
import TaskList from './taskList';

const TaskManager = () => {
    const [selectedDay, setSelectedDay] = useState(null);

    const handleDaySelect = (day) => {
        setSelectedDay(day);
    };

    return(
        <div>
            <TaskCalendar onSelectDay={handleDaySelect}/>
            <TaskList selectedDay={selectedDay}/>
        </div>
    );
};

export default TaskManager;


