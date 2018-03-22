const Query = require('../db/query');

class Socket {
    constructor(socket) {
        this.io = socket;
    }

    socketEvent() {
        this.io.on('connection', function (socket) {
            console.log(socket.id);

            /**
             * Evento para registrar a un usuario en el sistema.
             **/
            socket.on('register-request', function (data) {
                let response = Query.registerClient(data);
                socket.emit('register-response', response);
            });

            /**
             * Evento para la autenticacion de usuario
             **/
            socket.on('login', function (data) {
                let response = Query.loginClient(data);
            });

            /**
             * Evento para la desautenticacion de usuario
             **/
            socket.on('logout', function (data) {
                Query.logoutClient(data);
            });

            /**
             * Evento para la crear grupo de conversacion
             **/
            socket.on('join-group', function (data) {

            });

            /**
             * Evento para enviar mensajes dentro de una conversacion
             **/
            socket.on('send-message', function (data) {

            });

            /**
             * Evento para abandonar una conversacion
             **/
            socket.on('leave-group', function (data) {

            });
        })
    }

    socketConfig() {
        this.socketEvent();
    }
}

module.exports = Socket;