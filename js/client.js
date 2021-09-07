//const socket=io('http://localhost:8000');
//import io from 'socket.io-client'   

const socket = io('http://localhost:8000', {transports: ['websocket', 'polling', 'flashsocket']});

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
var audio=new Audio("mssg_sound.mp3");

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
    audio.play();}
}

//send server mssg if the form is submitted
form.addEventListener('submit',(e)=>{
    e.preventDefault(); //no reloading of page
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})
const na=prompt("enter your name to join")
socket.emit('new-user-joined',na);

//new user joining the chat
socket.on('user-joined',na =>{
 append(`${na} joined the chat!`,'right')
})

//if server sends message,receive it
socket.on('receive',data=>{
    append(`${data.na}:${data.message}`,'left')
   })

   //a user leaves the chat, append info to container
socket.on('left',na=>{
    append(`${na} left the chat`,'left');
   })