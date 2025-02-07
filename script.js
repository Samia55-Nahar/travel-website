document.getElementById("chatButton").addEventListener("click", function() {
    document.getElementById("chatBox").style.display = "block";
    addBotMessage("How can I help you?");
});

document.getElementById("closeChat").addEventListener("click", function() {
    document.getElementById("chatBox").style.display = "none";
});

document.getElementById("sendMessage").addEventListener("click", function() {
    sendMessage();
});

document.getElementById("chatInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

let waitingForEmail = false;

function sendMessage() {
    let inputField = document.getElementById("chatInput");
    let message = inputField.value.trim();
    
    if (message !== "") {
        addUserMessage(message);
        inputField.value = "";

        if (waitingForEmail) {
            validateEmail(message);
        } else {
            addBotMessage("Please provide your Gmail address. Our representative will contact you soon.");
            waitingForEmail = true;
        }
    }
}

function addUserMessage(text) {
    let chatMessages = document.getElementById("chatMessages");
    let newMessage = document.createElement("div");
    newMessage.textContent = "You: " + text;
    chatMessages.appendChild(newMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(text) {
    let chatMessages = document.getElementById("chatMessages");
    let newMessage = document.createElement("div");
    newMessage.style.color = "blue";
    newMessage.textContent = "Magic Travel: " + text;
    chatMessages.appendChild(newMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function validateEmail(email) {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (emailPattern.test(email)) {
        addBotMessage("Thank you! Our representative will contact you soon.");
        waitingForEmail = false;
    } else {
        addBotMessage("Please enter a valid Gmail address.");
    }
}