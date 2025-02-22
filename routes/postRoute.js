const express = require('express');
const post_route= express();

const bodyParser = require('body-parser');
post_route.use(bodyParser.json());
post_route.use(bodyParser.urlencoded({extended: true}));

const multer = require('multer');
const path = require('path');

// we are using disk storage rn for amazon s3 we gotta make little changes here
post_route.use(express.static('public'));
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,path.join(__dirname,'../public/postImages'),function(error,success){
      if(error){
        console.log(error);
      }
    });
     
    

  },
  filename:function(req,file,cb){
    const fileName = Date.now() + '-' + file.originalname;
cb(null, fileName, function(error, success) {

   
      if(error){
        console.log(error);
      }

    });

  }
});


const upload = multer({
  storage: storage,
  limits: { files: 4 } 
});

const postController = require('../controllers/postController');

post_route.post('/create-post', upload.array('images', 4), postController.createPost);




module.exports = post_route;