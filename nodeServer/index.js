//node server which will handle socket io connections

const io=require('socket.io')(8000)
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',na=>{
      //console.log("new user",na)
      users[socket.id]=na;
      socket.broadcast.emit('user-joined',na);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,na:users[socket.id]})
    });

    socket.on('disconnect',message=>{
      socket.broadcast.emit('left',users[socket.id]);
      delete users[socket.id];
  });
})