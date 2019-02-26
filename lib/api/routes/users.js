const express=require('express')
const router=express.Router();
const usersController=require('../controllers/users');

router.post('/auth', usersController.signIn);

module.exports = router;