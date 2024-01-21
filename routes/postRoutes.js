import express from 'express'
import { createPostController, deletePostController, getPostController, getSinglePostController, postCategoryController, postPhotoController } from '../controllers/postController.js'
import formidable from 'express-formidable'

const router = express.Router()

//routes
//create post
router.post('/create-post',formidable(),createPostController)

//get all post
router.get('/all-post',getPostController)

//single post
router.get('/single-post/:slug',getSinglePostController)

//get photo
router.get('/post-photo/:pid',postPhotoController)

//delete post
router.delete('/delete-post/:pid',deletePostController)

//get category wise product
router.get('/post-category/:slug',postCategoryController)
export default router