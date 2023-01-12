const db = require('../models');
const fs = require('fs');
const path = require('path');
const Post = db.posts;
const Op = db.Sequelize.Op;
const listOfReaders = db.listOfReaders;

//retrieves all posts from db
exports.getAllPosts = (req, res, next) => {
    Post.findAll({include: ['listOfReaders']})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Error occurred while fetching posts'
            });
        });
};

//retrieves one specific post by its id
exports.getOnePost= (req, res, next) => {
    const postId = req.params.id;
    Post.findByPk(postId, {include: ['listOfReaders']})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error fetching post with id= " + postId
            });
        });
};

//adds userID to a posts read list so front end can distinguish read from unread posts
exports.addReaderToList = (req, res, next) => {
    const newReader = {
        userId: req.body.userId,
        postId: req.body.postId
    }
    listOfReaders.create(newReader)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || 'Error occurred while updating reader list!'
        });
    });
}

//create and save a new post to db
exports.createPost = (req, res, next) => {
    //for image capture in coord with multer
    const url = req.protocol + "://" + req.get("host");
    //check if empty req
    if(!req.body.postTitle) {
        res.status(400).send({
            message: 'Post cannot be empty'
        });
        return;
    }
    //creating a new post with req body
    if(req.file) { 
        //case of post with img
        const post = {
            postTitle: req.body.postTitle,
            // postImage:"/images/" + req.file.path,
            postImage: url + "/images/" + req.file.filename,
            postDescription: req.body.postDescription,
            userId: req.body.userId,
        };
        Post.create(post)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || 'Error occurred while creating a post!'
                });
            });
    } else {
        const post = {
            postTitle: req.body.postTitle,
            postImage: req.body.postImage,
            postDescription: req.body.postDescription,
            userId: req.body.userId,
        };
         //save post in db
        Post.create(post)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || 'Error occurred while creating a post!'
                });
            });
    }
    
    // //save post in db
    // Post.create(post)
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || 'Error occurred while creating a post!'
    //         });
    //     });
};

//updates a post then replaces columns in db
exports.updatePost = (req, res, next) => {
    const postId = req.params.id;
    Post.update(req.body, {
        where: { id: postId}
    })
        .then(num => {
            // if 1 row affected then our post was updated correctly
            if(num == 1) {
                res.send({ message: 'Post updated successfully!'});

            } else {
                res.send({
                    message: 'Cannot update post with id= ' + postId
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error updating post with id= ' + postId
            });
        });
};

//delete a specific post by its id & unlinks postImage from static folder
exports.deletePost = (req, res, next) => {
    const postId = req.params.id;
    Post.findByPk(postId)
        .then(data => {
            const filename = data.postImage.split("/images/")[1];
            fs.unlink("images/" + filename , () => {
                Post.destroy({ where: {id: postId}})
                    .then(num => {
                        // if 1 row affected then our post was deleted correctly
                        if(num == 1) {
                            res.send({ message: 'Post deleted successfully!'});

                        } else {
                            res.send({
                                message: 'Cannot delete post with id= ' + postId
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: 'Error deleting post with id= ' + postId
                        });
                    });
            });
        });
    // Post.destroy({
    //     where: { id: postId}
    // })
    //     .then(num => {
    //         // if 1 row affected then our post was deleted correctly
    //         if(num == 1) {
    //             res.send({ message: 'Post deleted successfully!'});

    //         } else {
    //             res.send({
    //                 message: 'Cannot delete post with id= ' + postId
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: 'Error deleting post with id= ' + postId
    //         });
    //     });
};
