const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
    //   port : 3306,
      user : 'postgres',
      password : 'zerotomastery',
      database : 'Smartbrain'
    }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send(database.users) });
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));

app.listen(3000, ()=> {
    console.log('App is running on port 3000.');
});