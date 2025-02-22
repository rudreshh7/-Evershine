const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin:'*'
}));

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/product");

const post_route = require('./routes/postRoute');
app.use('/api',post_route);

app.listen(8000,function(){

  console.log('Server is Running');
})