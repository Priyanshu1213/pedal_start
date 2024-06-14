
const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://priyanhsuyadav39976:pn126@cluster0.lqwnbgj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));

module.exports=mongoose