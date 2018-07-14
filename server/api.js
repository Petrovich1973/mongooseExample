import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nocache from 'node-nocache';

import { serverPort } from '../etc/config.json';
import * as db from './utils/DataBaseUtils';

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers
app.get('/api/users', nocache, (req, res) => {
    setTimeout(() => db.listUsers().then(data => res.send(data)), 1000);
});

app.post('/api/users', (req, res) => {
    setTimeout(() => db.createUser(req.body).then(data => res.send(data)), 1000);
});

app.put('/api/users/:id', (req, res) => {
    setTimeout(() => db.editUser(req.params.id, req.body).then(data => res.send(data)), 1000);
});

app.delete('/api/users/:id', (req, res) => {
    // db.deleteUser(req.params.id).then(data => res.send(data));
    setTimeout(() => db.deleteUser(req.params.id).then(data => {
        const response = {
            msg: "User успешно удален",
            success: true,
            id: req.params.id
        }

        if(data.result.n === 0) 
        	return res.send({...response, success: false, msg: "Ошибка удаления!"});

        return res.send(response);
    }), 200);

});

const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});
