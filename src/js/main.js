"use strict";

const socket = io();

const username = document.querySelector("#username");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendBtn = document.querySelector(".sendBtn");

sendBtn.addEventListener("click", () => {
  const param = {
    name: username.value,
    msg: chatInput.value,
  };
  socket.emit("chatting", param);
});

socket.on("chatting", (data) => {
  //   const li = document.createElement("li");
  //   li.innerText = `${data.name}: ${data.msg}`;
  //   chatList.appendChild(li);
  const { name, msg, time } = data;
  const item = new liModel(name, msg, time);
  item.makeLi();
});

function liModel(name, msg, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = () => {
    const li = document.createElement("li");
    li.classList.add(username.value === this.name ? "sent" : "recieved");
    const dom = `<span class="profile">
    <span class="user">${this.name}</span>
    <img src="https://placeimg.com/50/50/any" alt="temp" />
  </span>
  <span class="message">${this.msg}</span>
  <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
  };
}

console.log(socket);
