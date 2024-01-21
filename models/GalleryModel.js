import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    photo:{
        type:String,
        required:true
    }


},{timestamps:true})

export default mongoose.model('gallery',gallerySchema)