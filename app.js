const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

//  Public folder and Pug
app.use(express.static('site/public'));
app.set('views', ('site/views'));
app.set('view engine', 'pug');

// Homepage Routes
app.get('/', (req, res) => res.render('homepage'));
app.get('/login', (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));


// Api Renders


const server = app.listen(port, () => console.log(`Listening on port ${server.address().port}`));
