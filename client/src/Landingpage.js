import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import './App.css'


const Landingpage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
    };

    const addTask = async (task) => {
        const response = await axios.post('http://localhost:5000/tasks', task);
        setTasks([...tasks, response.data]);
    };

    const updateTask = async (task) => {
        const response = await axios.put(`http://localhost:5000/tasks/${task._id}`, task);
        setTasks(tasks.map(t => t._id === task._id ? response.data : t));
        setSelectedTask(null);
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
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

export default Landingpage;
