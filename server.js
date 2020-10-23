const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Turn on routes
app.use(routes);

// turn on connection to db and server
// the sunc part means that this is Sequelize taking the models and connecting them to associated DB tables. If no table, it'll create it for you
// FORCE doesn't have to be included, but if set to tru, it drops and recreates all the database tables on startup

sequelize.sync({force: false}).then( () => {
    app.listen(PORT, () => console.log('Now Listening'));
});