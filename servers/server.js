const bodyParser = require("body-parser");
const express= require("express");
const app= express();
const db= require("./db");
const cors = require('cors');
const Task = require('./modal/taskschema');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json())





app.get('/',(req,res)=>{
    res.send("hello from backend")
})




// Routes
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
});

app.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

app.put('/tasks/:id', async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});



app.listen(5000, () => {
    console.log('Server is running on port 5000');
});