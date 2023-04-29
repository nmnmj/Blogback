import express from 'express'
import Usercontroller from '../controller/Usercontroller.js'
import userAuth from '../config/userAuth.js'

const router = express.Router()

//route level middleware to protect route
router.use("/myblog", userAuth)
router.use("/createblog", userAuth)
router.use("/deleteblog", userAuth)
router.use("/updateblog", userAuth)
router.use("/category", userAuth)


//public route
router.get("/", (req, res)=>{
    res.send("work")
})
router.get("/allblog", Usercontroller.allblog)
router.post("/sortedblog", Usercontroller.sortedblog)
router.post("/register", Usercontroller.register)
router.post("/login", Usercontroller.login)


//protected route
router.post("/category", Usercontroller.blogbycategory)
router.post("/myblog", Usercontroller.myblog)
router.post("/createblog", Usercontroller.createblog)
router.delete("/deleteblog", Usercontroller.deleteblog)
router.put("/updateblog", Usercontroller.updateblog)





export default router