const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));

app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/chat-client/views/index.html');
});

/*
io.on('connection', function (socket) {
    console.log('Client connected...');


    // db.sequelize.models.client.create({
    //     phoneNumber: '+5353182018',
    //     nickName: 'Guajiro',
    //     dateBirth: new Date(1984, 7, 30),
    //     email: 'guajiro@nauta.cu'
    // }).then(function (data) {
    //     console.log(data);
    // });

    db.client.findAll({
        where: {
            phoneNumber: '+5353182018'
        }
    }).then(function (response) {
        console.log(response[0].dataValues);
        // for (var i in clients) {
        //     console.log(clients[i].phoneNumber);
        //     console.log(clients[i].email);
        //     console.log(clients[i].dateBirth);
        //     console.log(clients[i].nickName);
        // }
    });

    socket.on('join', function (data) {
        // console.log(data);
    });

    socket.on('messages', function (data) {
        console.log(socket.client);
        socket.emit('broad', data);
        socket.broadcast.emit('broad', data);
    });

});
*/
const socketEvent = require('./chat-server/sockets/chatSockets');
socketEvent(io);

module.exports = app;