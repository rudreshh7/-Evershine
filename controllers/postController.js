const Post = require('../models/postModel');

const createPost = async (req, res) => {
  try {
    if (!req.files || req.files.length < 3) {
      return res.status(400).send({ success: false, msg: 'You must upload at least 3 images' });
    }

    // image filename extract kar lega
    const imageFiles = req.files.map(file => file.filename);

      // Create a new post instance
      const post = new Post({
        name: req.body.name,
        price: req.body.price,
        agentPrice: req.body.agentPrice,
        category: req.body.category,
        description: req.body.description,
        image: imageFiles
      });

 

    // Save post to the database
    const postData = await post.save();

    res.status(200).send({ success: true, msg: 'Post created successfully', data: postData });

  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = { createPost };

