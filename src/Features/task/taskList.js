import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasksState, addTask, editTask, deleteTask } from '../task/taskSlice';
import { nanoid } from "@reduxjs/toolkit";

const TaskList = ({ selectedDay }) => {
    const tasks = useSelector((state) => state.task.tasks);
    const dispatch = useDispatch();
    const [newTaskDesctription, setNewTaskDescription] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);

    if (!selectedDay) {
        return <div>Select the day.</div>
    }

    const tasksForSelectedDay = tasks[selectedDay]?.tasks || [];

    const handleAddTask = () => {
        const newTask = { id: nanoid(), description: newTaskDesctription };
        dispatch(addTask({ day: selectedDay, task: newTask }));
        setNewTaskDescription("");
    }

    const handleEditTask = (id) => {
        setEditTaskId(id);
        setNewTaskDescription(tasksForSelectedDay.find(task => task.id === id).description);
    }

    const editTaskSave = () => {
        dispatch(editTask({ day: selectedDay, taskId: editTaskId, updatedTask: { id: editTaskId, description: newTaskDesctription } }));
        setEditTaskId(null);
        setNewTaskDescription("");
    }

    const handleDeleteTask = (id) => {
        dispatch(deleteTask({ day: selectedDay, taskId: id }));
    }

    return (
        <div className="tasksDay">
            <h3>Tasks for {new Date(selectedDay).toLocaleDateString()}</h3>
            {tasksForSelectedDay.length > 0 ? (
                <ul>
                    {tasksForSelectedDay.map((task) => (
                        <li key={task.id}>{task.description}
                            <button className="btnUL" onClick={() => handleEditTask(task.id)}>Edit Task</button>
                            <button className="btnUL" onClick={() => handleDeleteTask(task.id)}>Delete Task</button>
                        </li>
                    ))}
                    <input type="text" value={newTaskDesctription} onChange={(e) => setNewTaskDescription(e.target.value)} placeholder="Type your task..."></input>
                    {editTaskId ? (
                        <button className="btnUL" onClick={editTaskSave}>Save edit</button>
                    ) : (
                        <button className="btnUL" onClick={handleAddTask}>Add task</button>
                    )}
                </ul>
            ) : (
                <>
                    <p>No tasks for {new Date(selectedDay).toLocaleDateString()}</p><br />
                    <input type="text" value={newTaskDesctription} onChange={(e) => setNewTaskDescription(e.target.value)} placeholder="Type your task..."></input>
                    <button className="btnUL" onClick={handleAddTask}>Add Task</button><br />
                </>
            )}
        </div>
    );
};

export default TaskList;