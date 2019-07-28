const express = require('express')
const router = express.Router();
const usersController = require('./controller');
const AccessControl = require('../../middleware/accessControl')

router.post('/auth', usersController.signIn);

router.get('/protected', AccessControl.check(), (req, res, next) => {
    res.status(200).send({ message: 'Hello from protected path' })
})

module.exports = router;