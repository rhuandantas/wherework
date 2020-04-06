const socketio = require('socket.io');
const connectedUsers = {};

const socket = (server) => {
    const io = socketio(server);
    io.on('connection', socket => {
        const { user_id } = socket.handshake.query;
        connectedUsers[user_id] = socket.id;
    });

    const connection = (req, res, next) => {
        req.io = io;
        req.connectedUsers = connectedUsers;
        next();
    }
    console.log('socket connected')
    return connection;
}

module.exports = socket;