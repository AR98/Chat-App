const socket = io("http://localhost:8000", {transports: ['websocket']});

const form = document.getElementById("send-container");
const msgInput = document.getElementById("msgInput");
const msgContainer = document.querySelector(".container");
const audio = new Audio('ting.mp3');

const user_name =  prompt("Please enter your name");
console.log(user_name);
socket.emit("new-user-joined", user_name);

socket.on("user-joined", data=>{
    append(`${data} joined the chat`, "left");
});

socket.on("receive", data=>{
    append(data.message, "left");
});

socket.on("leave", name=>{
    append(`${name} left the chat`, "left");
});

const append = (message, position) => {
    let msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);

    if(position == 'left'){
        audio.play();
    }

};

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let message = msgInput.value;
    append(`you: ${message}`, "right");
    socket.emit("send", message);
    msgInput.value = ""; 
})
