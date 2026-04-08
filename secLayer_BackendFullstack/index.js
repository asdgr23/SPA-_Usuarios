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

// Conectar base de datos
conectarDB();

// Middleware
app.use(express.json());

app.use(cors({
  origin: '*', // puedes restringir luego si quieres
}));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/stakeholders', stakeholderRoutes);

//  Ruta de prueba
app.get('/api', (req, res) => {
  res.send('API funcionando correctamente');
});

// (opcional) eliminar si no usas frontend dentro del backend
// app.use(express.static(path.join(__dirname, 'public')));

// Fallback (IMPORTANTE que sea lo último)
app.use((req, res) => {
  res.status(404).json({ msg: 'Ruta no encontrada' });
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});



