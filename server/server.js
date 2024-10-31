const express = require('express');
const taskRoutes = require('./routes/TaskRoutes')
const userRoutes = require('./routes/UserRoutes')

const app = express();

app.use(express.json());
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Test server'); 
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});