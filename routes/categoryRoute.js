import express from "express";
import { allCategoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

//routes
//create-category
router.post('/create-category',createCategoryController)


//update category
router.put('/update-category/:id',updateCategoryController)

//get all category
router.get('/all-category',allCategoryController)

//get single category
router.get('/single-category/:slug',singleCategoryController)

//delete category
router.delete('/delete-category/:id',deleteCategoryController)
export default router