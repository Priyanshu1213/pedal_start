import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import './App.css'


const App = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('https://pedal-start-api.vercel.app/tasks');
        setTasks(response.data);
    };

    const addTask = async (task) => {
        const response = await axios.post('https://pedal-start-api.vercel.app/tasks', task);
        setTasks([...tasks, response.data]);
    };

    const updateTask = async (task) => {
        const response = await axios.put(`https://pedal-start-api.vercel.app/tasks/${task._id}`, task);
        setTasks(tasks.map(t => t._id === task._id ? response.data : t));
        setSelectedTask(null);
    };

    const deleteTask = async (id) => {
        await axios.delete(`https://pedal-start-api.vercel.app/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
    };

    return (
        <div className="App">
            <h1>Task Manager</h1>
            <TaskForm addTask={addTask} selectedTask={selectedTask} updateTask={updateTask} />
            <ul>
                {tasks.map(task => (
                    <Task key={task._id} task={task} deleteTask={deleteTask} setSelectedTask={setSelectedTask} />
                ))}
            </ul>
        </div>
    );
};

export default App;
