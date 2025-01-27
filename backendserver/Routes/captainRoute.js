const express=require('express')
const captainController=require('../Controllers/captainController')
const router=express.Router();
const CaptainAuth=require("../Authmiddleware/captainAuth")
const {body}=require('express-validator')

router.post("/register",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
],captainController.Register)  


router.post("/login",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],

captainController.Login)


router.get("/profile",CaptainAuth.isCaptainAuth,captainController.getProfile)

router.get("/logout",captainController.Logout)
module.exports=router