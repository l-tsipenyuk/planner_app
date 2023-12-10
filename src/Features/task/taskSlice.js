import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: {},
}

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const { day, task } = action.payload;
            if (!state.tasks[day]) {
                state.tasks[day] = {tasks: [task]};
            } else {
                state.tasks[day].tasks.push(task);
            }
        },
        editTask: (state, action) => {
            const { day, taskId, updatedTask } = action.payload;
            const index = state.tasks[day].tasks.findIndex((task) => task.id === taskId);
            state.tasks[day].tasks[index] = updatedTask;
        },
        deleteTask: (state, action) => {
            const { day, taskId } = action.payload;
            state.tasks[day].tasks = state.tasks[day].tasks.filter((task) => task.id !== taskId);
        },
    },
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;

export const tasksState = (state) => state.task;

export default taskSlice.reducer;