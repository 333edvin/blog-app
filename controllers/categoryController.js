import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"

//create category======================================
export const createCategoryController = async(req,res)=>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({
                message:"name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category already Exists"
            })
        }

        const category = await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:"New Category Created",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in category",
            error
        })
        
    }
}

//update category==========================================
export const updateCategoryController = async(req,res)=>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while updating category",
            error
        })
        
    }
}

//get all category=======================================

export const allCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"Fetched all categories",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting all category",
            error
        })
        
    }

}

//single category controller===============================

export const singleCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Fetched single category",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting single category ",
            error
        })
        
    }

}
//delete Category ========================================

export const deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Category Deleted"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while deleting category",
            error
        })
        
    }
}