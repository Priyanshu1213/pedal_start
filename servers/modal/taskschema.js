const mongoose=require("mongoose")

const TaskSchema = new mongoose.Schema({
    title:String,
    
    description:String,
    
    dueDate:Date
});

const Task = mongoose.model('Task', TaskSchema);
module.exports=Task