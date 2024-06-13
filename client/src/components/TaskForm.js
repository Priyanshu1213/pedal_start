import React, { useState, useEffect } from 'react';
import './tasks.css'

const TaskForm = ({ addTask, selectedTask, updateTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title);
            setDescription(selectedTask.description);
            setDueDate(new Date(selectedTask.dueDate).toISOString().split('T')[0]);
        }
    }, [selectedTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = { title, description, dueDate };
        if (selectedTask ) {
            updateTask({ ...task, _id: selectedTask._id });
        } else {
            addTask(task);
        }
        setTitle('');
        setDescription('');
        setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button className='btu' type="submit">{selectedTask ? 'Update' : 'Add'} Task</button>
        </form>
    );
};

export default TaskForm;
