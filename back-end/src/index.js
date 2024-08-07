const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const routes = require('./routes/routes');
const database = require('./database/config');
const { errorInJsonBody } = require('./middlewares/errorInJsonBody');
const generalErrors = require('./middlewares/generalErrors');

const textInitialWhenConnect = `
-----------------------------------------------
|                                             |
|              SERVER STARTED                 |
|                                             |
| Server is running at https://localhost:3000 |
|                                             |
-----------------------------------------------
`;

// Server config
const app = express();
// For convert JSON on Js Object
app.use(express.json());

// Check if the json strutucture is correct
app.use(errorInJsonBody);

const corsOptions = {
  credentials: true,
  origin: 'https://localhost:3000',
};

// For minimize erros about cors
app.use(cors(corsOptions));
app.use(routes);
// Middleware so that errors can respond to the client in case of errors
app.use(generalErrors);

// For read ssl certified
const options = {
  key: fs.readFileSync('ssl/code.key'),
  cert: fs.readFileSync('ssl/code.crt'),
};

// Server port
const port = 3000;

// Function for create the HTTPS server
const server = https.createServer(options, app);

// Calling the function to start the server.
async function startServer() {
  try {
    // Attempts to synchronize with the database before starting the server
    await database.sync();

    // Starting the server
    server.listen(port, () => console.log(textInitialWhenConnect));
  } catch (error) {
    console.log(error);
    throw new Error('Houve um erro inesperado');
  }
}

startServer();
