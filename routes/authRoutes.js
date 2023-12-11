const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/authController');


const router = express.Router();

//get all users
router.get('/all-user',getAllUsers)
//create user
router.post('/register',registerController)
//login
router.post('/login',loginController);

module.exports=router;