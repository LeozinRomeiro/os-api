const express = require('express')
const comunicacaoFront = require('cors')
const app = express()
require('./config/initDB')

app.use(
  comunicacaoFront({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const authRoutes = require('./routes/authRoutes')
const ordemRoutes = require('./routes/ordemRoutes')
const usuarioRoute = require('./routes/usuarioRoute')
const atividadeRoutes = require('./routes/atividadeRoutes')
const clientesRoutes = require('./routes/clienteRoute')

app.use('/api/auth', authRoutes)
app.use('/api/ordens', ordemRoutes)
app.use('/api/usuarios', usuarioRoute)
app.use('/api/atividade', atividadeRoutes)
app.use('/api/clientes', clientesRoutes)

const port = 3000
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}...`)
})
