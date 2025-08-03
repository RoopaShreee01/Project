function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value;
  //const chatBox = document.getElementById("chatBoxArea");
  const chatid = document.getElementById("chatlabel");

  const ChatHistory = {
    sentTime: new Date().toLocaleString(),
    userName: chatid.innerText,
    userText: message,
  };

  const chatHistoryDetails = localStorage.getItem("ChatHistory")
    ? JSON.parse(localStorage.getItem("ChatHistory"))
    : [];

  if (message !== "") {
    chatHistoryDetails.push(ChatHistory);
    localStorage.setItem("ChatHistory", JSON.stringify(chatHistoryDetails));
    input.value = "";
    displayChatMessages(); // Refresh chat box after sending
  }
}

function displayChatMessages() {
  const chatBox = document.getElementById("chatBoxArea");
  chatBox.innerHTML = ""; // Clear previous messages
  const chatHistoryDetails = localStorage.getItem("ChatHistory")
    ? JSON.parse(localStorage.getItem("ChatHistory"))
    : [];
  chatHistoryDetails.forEach((msg) => {
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-message";
    msgDiv.innerHTML = `${msg.userName} [${msg.sentTime}] : ${msg.userText}`;
    chatBox.appendChild(msgDiv);
  });
}

function refreshMessage() {
  displayChatMessages();
}

//window.addEventListener("DOMContentLoaded", displayChatMessgaes);
