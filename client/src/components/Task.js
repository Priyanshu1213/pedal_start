import React from 'react';
import './tasks.css'

const Task = ({ task, deleteTask, setSelectedTask }) => {
    return (
        <li>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <button onClick={() => setSelectedTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
        </li>
    );
};

export default Task;
