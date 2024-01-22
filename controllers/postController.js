import slugify from "slugify"
import postModel from "../models/postModel.js"
import fs from 'fs'
import categoryModel from "../models/categoryModel.js"

//post creation ============================================
export const createPostController = async(req,res)=>{
    try {
        const {name,slug,category} = req.fields
        const {photo} = req.files

        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is Required"})
            case !category:
                return res.status(500).send({error:"Category is Required"})
            case photo && photo.size > 1000000:
                return res.status(500).send({error:"Photo is Required (should be less than 1mb)"})

        }
        const post = new postModel({...req.fields,slug:slugify(name)})
        if(photo){
            post.photo.data = fs.readFileSync(photo.path)
            post.photo.contentType = photo.type
        }
        await post.save()
        res.status(201).send({
            success:true,
            message:'Uploaded Successfully',
            post
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while uploading Post",
            error
        })
        
    }

}

//get posts=================================================
export const getPostController = async(req,res)=>{
    try {
        const post = await postModel.find({}).populate('category').select("-photo").limit(30).sort({createdAt:-1})
        res.status(200).send({
            total:post.length,
            success:true,
            message:"Posts Fetched successfully",
            post
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error getting posts",
            error
        })

    }
}

//get single post controller ==============================

export const getSinglePostController = async(req,res)=>{
    try {
        const post = await postModel.findOne({slug:req.params.slug}).select("-photo").populate('category');
        res.status(200).send({
            success:true,
            message:"Single Post Fetched",
            post
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting single post",
            error
        })
        
    }
}

//get photo ===================================================
export const postPhotoController = async(req,res)=>{
    try {
        const post = await postModel.findById(req.params.pid).select("photo")
        if(post.photo.data){
            res.set('Content-type',post.photo.contentType)
            return res.status(200).send(post.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error getting photo",
            error
        })
        
    }
}

//delete post=======================================================
export const deletePostController = async(req,res)=>{
    try {
        await postModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:'Post Deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while deleting post",
            error
        })
        
    }
}

//get category wise product
export const postCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        const posts = await postModel.find({ category: category._id }).populate("category")
        res.status(200).send({
            success:true,
            message:"successfully fetched",
            category,
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"error in category wise product",
            error
        })
        
    }
}
