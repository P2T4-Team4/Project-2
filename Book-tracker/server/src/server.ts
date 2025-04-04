const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { sequelize } from './config/connection.js';
import routes from './routes/index.js';
import {searchBooks} from './Controllers/SearchController.js'; // Adjust the import path as necessary

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);
app.get('/', searchBooks); // Search for books using Google Books API

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
