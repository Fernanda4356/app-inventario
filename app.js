const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personasRoutes = require('./routes/persona.routes');
const productoRoutes=require('./routes/producto.routes')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/personas', personasRoutes);
app.use('/api/productos',productoRoutes);




mongoose.connect('mongodb+srv://20233tn129:ali1105m.@ali.n62y5.mongodb.net/?retryWrites=true&w=majority&appName=Ali')
    .then(() => {
        console.log('Connected to the database!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
    });
