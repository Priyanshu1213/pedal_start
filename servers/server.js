const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.use(cors());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header("Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept");
     next();
  })

app.get('/check',(req,res)=>{
    res.send("hello from backend")})





// Connect to MongoDB

mongoose.connect('mongodb+srv://priyanhsuyadav39976:pn126@cluster0.lqwnbgj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{useNewUrlParser: true,  useUnifiedTopology: true})
const connection=mongoose.connection
connection.on("error",()=>{
    console.log("mongobd not connected ")
})
connection.on("connected",()=>{
    console.log("mongobd connected")
})
module.exports=mongoose



//schema
const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date
});
const Task = mongoose.model('Task', TaskSchema);





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


// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
