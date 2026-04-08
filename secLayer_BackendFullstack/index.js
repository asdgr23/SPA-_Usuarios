require('dotenv').config();

const cors = require('cors');
const express = require('express');
const path = require('path');
const conectarDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const productosRoutes = require('./src/routes/productosRoutes');
const stakeholderRoutes = require('./src/routes/stakeholderRoutes');

const app = express();

//Conectar base de datos
conectarDB();

//Middleware para leer JSON
app.use(express.json());

//Middleware CORS
app.use(cors());

//Registrar rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/stakeholders', stakeholderRoutes);

//Ruta de prueba
app.get('/', (req, res)  => {
    res.send('Servidor express funcionando');
});

//Servir frontend
app.use(express.static(path.join(__dirname, 'public')));

//Fallback Angular (MUY IMPORTANTE)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log (`Servidor corriendo en
        http://localhost:${PORT}`);
});




