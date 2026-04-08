const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/authController');

//Ruta register 
router.post('/register', register);

//Ruta login 
router.post('/login', login);

module.exports = router;
