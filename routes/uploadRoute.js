import express from "express";
import {postController} from '../controllers/photoController.js'
//router objejct
const router = express.Router()

//routing
//posting photo
router.post('/post-photo',postController)

export default router