const express =require('express');
const app = express();
let cors = require('cors');
const bodyParser = require('body-parser');

// Usamos express para crear el servidor
// Body-parser para trabajar con los datos en angular
// Nodemon para que se ejecute el servidor automaticamente
// Cors para que se pueda acceder desde cualquier lugar

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/correoRoutes'));

// Puerto
app.listen(3000, () => {
    console.log('Server 3000');
});