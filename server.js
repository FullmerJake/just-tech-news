const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

//Handlebars.js template engine 
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: [],
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({db: sequelize})
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// built in middleware function that can take all of the contents of a folder and serve them as static assets. 
// useful for front-end specific files like images, style sheets and javascript files. 
app.use(express.static(path.join(__dirname, 'public')));

// Turn on routes
app.use(routes);

// turn on connection to db and server
// the sunc part means that this is Sequelize taking the models and connecting them to associated DB tables. If no table, it'll create it for you
// FORCE doesn't have to be included, but if set to tru, it drops and recreates all the database tables on startup - functions like DROP TABLE IF EXISTS

sequelize.sync({force: false}).then( () => {
    app.listen(PORT, () => console.log('Now Listening'));
});