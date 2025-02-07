const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users : [
        {
            id: '1',
            name: 'Amr',
            email: 'maxi@m.com',
            password: 'maxi',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Samo',
            email: 'samo@faceRec.com',
            password: 'strawberry',
            entries: 0,
            joined: new Date()
        }
    ],
    
    login: [
        {
            id: '2',
            hash: '',
            email: 'samo@faceRec.com'
        }
    ], 
    nextId: 3
    
}

app.get('/', (req, res) => {
    res.send(database)
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false; 
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        } 
    })

    if (!found) {
        res.status(400).json('not found');
    }
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false; 
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        } 
    })

    if (!found) {
        res.status(400).json('not found');
    }
})

app.post('/register', (req, res) => {

    
    bcrypt.hash('bacon', null, null, function(err, hash) {
        console.log('Here: ', hash)
    });

    const {email, name, password} = req.body;

    database.users.push({
            id: database.nextId,
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
    })
    console.log(database.users.length)

    res.json(database.users[database.users.length-1]);

})

app.post('/signIn', (req, res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('SUCCESS');
        } else {
            res.json('SUCCESS');
        }
})



app.listen(3001, () => {
    console.log('app is running');
})

/*
    Sign In => POST

*/