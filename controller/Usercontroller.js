import blogModel from "../model/blogmodel.js"
import userModel from "../model/usermodel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class Usercontroller{
    static register = async (req, res)=>{
        const {name, email, password} = req.body
        try {
            let salt = await bcrypt.genSalt(10)
            let hpwd = await bcrypt.hash(password, salt)
            let doc = new userModel({
                name, email, password:hpwd
            })
            let r = await doc.save()
            res.status(201).send({"email":email, "name":name, "status":"success"})

        } catch (error) {
            res.status(400).send({error, "status":"failed"})
        }
    }
    static login = async (req, res)=>{
        const {name, password} = req.body
        try {
            let r = await userModel.findOne({name})
            let pchekc = await bcrypt.compare(password, r.password)
            if(r && pchekc){
                let token = jwt.sign({userID:r._id}, process.env.JWT_SECRET_KEY, {expiresIn:"1d"})
                let blogs = await blogModel.find({name})
                res.status(200).send({blogs, "token":token, "name":name, "status":"success"})
            }
            else{
                res.status(400).send({"user":"not exists", "status":"failed"})
            }
        } catch (error) {
            res.status(400).send({"user":"not exists", "status":"failed"})
        }
    }
   
    static createblog = async (req, res)=>{
        const {title, description, category, name} = req.body
        try {
            let doc = new blogModel({
                title, description, category, name
            })
            let r = await doc.save()
            let blogs = await blogModel.find({name})
            res.status(200).send({blogs, "status":"success"})
        } catch (error) {
            res.status(400).send({error, "status":"failed"})
            
        }
    }
    static deleteblog = async (req, res)=>{
        const {_id} = req.body
        try {
            let deleteblog = await blogModel.findByIdAndDelete({_id})
            let blogs = await blogModel.find({name:deleteblog.name})
            res.status(200).send({blogs, "status":"success"})
        } catch (error) {
            res.status(400).send({error, "status":"failed"})
            
        }
    }
    static updateblog = async (req, res)=>{
        const {description, _id, name} = req.body
        try {
            let updateblog = await blogModel.findOneAndUpdate({_id}, { description})
            let blogs = await blogModel.find({name})
            res.status(200).send({blogs, "status":"success"})
        } catch (error) {
            res.status(400).send({error, "status":"failed"})
            
        }
    }
    static allblog = async (req, res)=>{
        try {
            let blogs = await blogModel.find()
            res.status(200).send(blogs)
        } catch (error) {
            res.status(400).send(error)
            
        }
    }
    static sortedblog = async (req, res)=>{
        try {
            let blogs = await blogModel.find().sort({ time: "desc" })
            res.status(200).send(blogs)
        } catch (error) {
            res.status(400).send(error)
            
        }
    }
    static myblog = async (req, res)=>{
        let {name}= req.body
        try {
            let mblog = await blogModel.find({name})
            res.status(200).send({"blogs":mblog, "status":"success"})
        } catch (error) {
            res.status(400).send({"status":"failed"})
            
        }
    }
    static blogbycategory = async (req, res)=>{
        let {category}= req.body
        try {
            let cblog = await blogModel.find({category})
            res.status(200).send(cblog)
        } catch (error) {
            res.status(400).send(error)
            
        }
    }
    
}

export default Usercontroller