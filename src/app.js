const express = require('express');
const app = express();
const config = require('config');
const initDB = require('./config/initDB');

app.use(express.json());

//const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
//const userRoutes = require('./routes/userRoutes');

//app.use('/api/auth', authRoutes);
app.use('/api/ordens', orderRoutes);
//app.use('/api/usuarios', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`)
});