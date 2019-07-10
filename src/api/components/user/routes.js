const express=require('express')
const router=express.Router();
const usersController=require('./controller');

router.post('/auth', usersController.signIn);

module.exports = router;