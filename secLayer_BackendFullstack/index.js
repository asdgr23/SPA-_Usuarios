require('dotenv').config();

const cors = require('cors');
const express = require('express');
const conectarDB = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const productosRoutes = require('./src/routes/productosRoutes');
const stakeholderRoutes = require('./src/routes/stakeholderRoutes');

const app = express();

// Conectar base de datos
conectarDB();

// Middleware
app.use(express.json());

// CORS (permitir todo temporalmente, puedes restringir luego)
app.use(cors());

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/stakeholders', stakeholderRoutes);

// 🔹 Ruta de prueba para verificar que backend levantó
app.get('/api/test', (req, res) => {
    res.json({ ok: true, mensaje: 'Backend funcionando 🚀' });
});

// Fallback para cualquier ruta que no exista
app.use((req, res) => {
    res.status(404).json({ msg: 'Ruta no encontrada' });
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});