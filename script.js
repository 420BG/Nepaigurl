// Firebase Setup (Ensure you replace with your config)
const firebaseConfig = {
    apiKey: "AIzaSyDCmeE634QX1g-meeVb-8yvDY4EOupthQc",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "nepaigurl",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "1066538934992",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

// Google Sign-In
document.getElementById("google-signin").addEventListener("click", function() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => alert("Signed in as: " + result.user.displayName))
    .catch(error => alert("Error: " + error.message));
});

// Toggle Settings Menu
document.getElementById("settings-btn").addEventListener("click", function() {
    let menu = document.getElementById("settings-menu");
    menu.style.display = menu.style.display === "none" ? "block" : "none";
});

// Gemini AI API Key (Replace with your actual key)
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

// Chatbot Functionality
document.getElementById("send-btn").addEventListener("click", async function() {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    let chatBox = document.getElementById("chat-box");

    // Add user message
    let userMessage = document.createElement("div");
    userMessage.textContent = "You: " + userInput;
    chatBox.appendChild(userMessage);

    // Call Gemini AI for response
    let botResponse = await getGeminiResponse(userInput);

    // Add bot message
    let botMessage = document.createElement("div");
    botMessage.textContent = "Bot: " + botResponse;
    chatBox.appendChild(botMessage);

    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
    document.getElementById("user-input").value = "";
});

// Function to call Gemini AI API
async function getGeminiResponse(userText) {
    try {
        let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash?key=${AIzaSyBEVgPdNDVJM4NV4Ze2oxSiENLsl2TjKCk}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: userText, max_tokens: 100 })
        });

        let data = await response.json();
        return data.candidates ? data.candidates[0].output : "Sorry, I didn't understand that.";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Oops! Something went wrong.";
    }
}
