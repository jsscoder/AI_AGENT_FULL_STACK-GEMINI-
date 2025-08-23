const authMiddleware = require("../middleware/auth");
const router=require("express").Router()
const {signup, login, logout,getUsers,updateUser}=require("../controllers/user")


router.post("/update-user",authMiddleware,)
router.get("/get-user",authMiddleware,getUsers)
router.post("/login",authMiddleware,login)
router.post("/logout",authMiddleware,logout)
router.post("/asign-up",authMiddleware,signup)

module.exports=router