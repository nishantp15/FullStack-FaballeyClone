const express = require('express');
const {register, login, loggedinUser} = require('../Controllers/usersController')
const {auth} = require('../middleware/auth');
const AuthRouter = express.Router();

AuthRouter.post('/register', register);
AuthRouter.post('/login', login);
AuthRouter.get('/loggedin', auth, loggedinUser);

module.exports = AuthRouter;
