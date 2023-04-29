import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{type:String, required:true, trim:true},
    description:{type:String, required:true, trim:true},
    category:{type:String, required:true, trim:true},
    name:{type:String, required:true, trim:true},
    time:{type:Date, default:Date.now()}
})

const blogModel = mongoose.model("blog", blogSchema)


export default blogModel