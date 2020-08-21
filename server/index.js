require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const massive = require('massive');
app.use(express.json());
const ctrl = require('./controller')

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env;

app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 72},
    secret: SESSION_SECRET
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('connected to db')
}).catch(err => console.log(err));

app.post('/auth/register', ctrl.register);
app.post('/auth/login', ctrl.login)
app.get('/auth/user', ctrl.getUser);
app.get('/auth/logout', ctrl.logout);
app.get('/api/posts/:userId', ctrl.getPosts);
app.post('/api/addpost', ctrl.addPost);



app.listen(SERVER_PORT, () => console.log('Server is running on port ' + SERVER_PORT));