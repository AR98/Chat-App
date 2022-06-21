const io = require("socket.io")(8000, 
    {cors: {
        origin: ['http://localhost:5500'],
 }});


const users = {};

io.sockets.on("connection", socket => {
    socket.on("new-user-joined", user_name => {
        users[socket.id] = user_name;
        socket.broadcast.emit("user-joined", user_name);
    });
    socket.on("send", message => {
        socket.broadcast.emit("receive", {message, name: users[socket.id]});
    })
    socket.on("disconnect", message => {
        socket.broadcast.emit("leave", users[socket.id]);
        delete users[socket.id];
    })
})