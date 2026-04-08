const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // 1. Buscar usuario
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Usuario no existe'
      });
    }

    // 2. Validar contraseña
    const passwordValido = bcrypt.compareSync(
      password,
      usuario.password
    );

    if (!passwordValido) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Password incorrecto'
      });
    }

    // 3. Generar Token
    const token = jwt.sign(
      { uid: usuario.id, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
    );

    // 4. Respuesta
    res.json({
      ok: true,
      usuario,
      token
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      mensaje: 'Error en login'
    });
  }
};

module.exports = {
  login
};

const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si ya existe
    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El usuario ya existe'
      });
    }

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    const passwordEncriptado = bcrypt.hashSync(password, salt);

    // Crear usuario
    const usuario = new Usuario({
      nombre,
      email,
      password: passwordEncriptado,
      rol
    });

    await usuario.save();

    res.json({
      ok: true,
      mensaje: 'Usuario registrado correctamente'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error en registro'
    });
  }
};

module.exports = {
  login,
  register
};