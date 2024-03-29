const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const Forum = require('../models/forum.js')
const Comment = require('../models/comment.js')
const Tag = require('../models/tag.js')
const { forumValStruct } = require('../middlewares/validation.js')
const { validate, StructError } = require('superstruct')
const { loggedIn } = require('../middlewares/authentication.js')


//ROUTES
///////CREATE///////
router.post ('/create', loggedIn, (req, res) => {
    //Authorize logic
        //validate information
        //layer 1 superstruct
        //layer2 mongoose
    const [error, forumVal] = validate(req.body, forumValStruct)
    //TODO better error handling, with try/catch
    //https://docs.superstructjs.org/guides/05-handling-errors
    if (error instanceof StructError) {
        console.error(error)
        res.json(error)
    } else {
        Forum.create(forumVal, (error, createdForum) => {
            if (error) {
                console.error(error)
            } else {

                User.findByIdAndUpdate(createdForum.forumOwner, {
                    $push: {
                        userForums: createdForum.id
                    }
                }, (error, updatedUserForum) => {
                    if (error) {
                        console.error(error)
                    }
                })

                Tag.updateMany({
                    _id: {
                        $in: createdForum.parentTags
                    }
                }, {
                    $push: {
                        taggedForums: {
                            _id: createdForum._id
                        }
                    }
                }, (error, updatedTags) => {
                    if (error) {
                        console.error(error)
                    }
                })
    //$each to push each tag into an array
                res.json(createdForum)
            }
        })
    }
})
///////INDEX///////
router.get('/index', (req, res)=> {
    Forum.find((error, foundForums) => {
        if (error) {
            console.error(error)
        } else {
            res.json(foundForums)
        }
    })
})

///////SHOW///////
//forum id
router.get('/:id', (req, res) => {
    Forum.findById(req.params.id, (error, foundForum) => {
        if (error) {
            console.error(error)
        } else {
            res.json(foundForum)
        }
    })
})

//UPDATE
//forum id
router.put('/:id', loggedIn, (req,res) => {
    //Authorize logic
        //validate information
        //layer 1 superstruct
        //layer2 mongoose
    const [error, forumVald] = validate(req.body, forumValStruct)
    //TODO better error handling, with try/catch
    //https://docs.superstructjs.org/guides/05-handling-errors
    if (error instanceof StructError) {
        console.error(error)
        res.json(error)
    } else {
        const [error, forumVald] = validate(req.body, forumValStruct)
        //TODO better error handling, with try/catch
        //https://docs.superstructjs.org/guides/05-handling-errors
        if (error instanceof StructError) {
            console.error(error)
            res.json(error)
        } else {
            Forum.findByIdAndUpdate(
                req.params.id,
            {
                ...req.body
            }, (error, updatedForum) => {
                if (error) {
                    console.error(error)
                } else {
                    res.json({message:"successful"})
                }
            })
        }
    }
})

//DELETE
//forum id (╯°Д°)╯︵/(.□ . \)
router.delete('/:id', loggedIn, (req,res) => {
        Forum.findByIdAndDelete(
            req.params.id,
            (error, deletedForum) => {
            if (error) {
                console.error(error)
            } else {

                User.updateMany({}, {
                    $pull: {
                        userForums: {
                            $in: deletedForum._id
                        }
                    }
                }, (error, updatedUser) => {
                    if (error) {
                        console.error(error)
                    }
                })

                User.updateMany({}, {
                    $pull: {
                        userComments: {
                            $in: deletedForum.comments
                        }
                    }
                }, (error, updatedUser) => {
                    if (error) {
                        console.error(error)
                    }
                })

                Comment.deleteMany({
                    _id: {
                        $in: deletedForum.comments
                    }
                }, (error, deletedComment) => {
                    if (error) {
                        console.error(error)
                    }
                })

                Tag.updateMany({}, {
                    $pull: {
                        taggedForums: {
                            $in: deletedForum._id
                        }
                    }
            }, (error, updatedTag) => {
                if (error) {
                    console.error(error)
                }
            })

                res.json({message: "Forum Deleted"})
            }
        })
})

module.exports = router
