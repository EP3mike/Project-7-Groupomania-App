// routers for all post related endpoints
const express = require('express');
const router = express.Router();

//controller
const postController = require('../controllers/post');

//middleware
const authorize = require('../middleware/auth'); //jwt check
// const multer = require('../middleware/multer');


// router.get('/', postController.getAllPosts);
// router.get('/:id', postController.getOnePost);
// router.post('/', postController.createPost);
// router.put('/:id', postController.updatePost)
// router.delete('/:id', postController.deletePost);


router.get('/', authorize.verifyToken , postController.getAllPosts);
router.get('/:id', authorize.verifyToken  , postController.getOnePost);
router.post('/', authorize.verifyToken  , postController.createPost);
//for adding users to list of readers on post
router.post('/:id', authorize.verifyToken  , postController.addReaderToList);

router.put('/:id', authorize.verifyToken  , postController.updatePost)
router.delete('/:id', authorize.verifyToken  , postController.deletePost);

module.exports = router;