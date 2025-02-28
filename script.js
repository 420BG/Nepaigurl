// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvnAe_ab2mYB2na1ewIrucShCxUQ2TS84",
    authDomain: "your-firebase-app.firebaseapp.com",
    projectId: "your-firebase-app",
    storageBucket: "your-firebase-app.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById('google-signin').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            document.getElementById('auth-section').style.display = 'none';
            document.getElementById('chat-section').style.display = 'block';
        })
        .catch(error => console.error(error.message));
});

document.getElementById('send-btn').addEventListener('click', async () => {
    const userMessage = document.getElementById('user-input').value;
    if (!userMessage) return;

    document.getElementById('chat-box').innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateText?key=AIZaSyBEVgPdNDVJM4NV4Ze2oxSiENLsl2TjKCk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: { text: userMessage } })
    });

    const data = await response.json();
    const aiMessage = data?.candidates?.[0]?.output || "Sorry, I didn't understand.";

    document.getElementById('chat-box').innerHTML += `<p><strong>AI:</strong> ${aiMessage}</p>`;
    document.getElementById('user-input').value = "";
});
