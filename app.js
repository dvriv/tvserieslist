const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const db = require('./db/db');
const bodyParser = require('body-parser');

const userRouter = require('./api/user/user.route.js');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Public folder and Pug
app.use(express.static('site/public'));
app.set('views', ('site/views'));
app.set('view engine', 'pug');

// Homepage Routes
app.get('/', (req, res) => res.render('homepage'));
app.get('/login', (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));

// API routes are on every API folder

app.use('/api/users', userRouter);


const server = app.listen(port, () => console.log(`Listening on port ${server.address().port}`));
