const firebaseConfig = {
    apiKey: "AIzaSyCvnAe_ab2mYB2na1ewIrucShCxUQ2TS84",
    authDomain: "your-firebase-app.firebaseapp.com",
    projectId: "your-firebase-app",
    storageBucket: "your-firebase-app.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        alert("Signed in as " + result.user.email);
        document.getElementById('menu').style.display = 'none';
    }).catch(error => alert(error.message));
}

function logout() {
    auth.signOut().then(() => alert("Logged out"));
}

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('menu').style.display = 'none';
    } else {
        document.getElementById('menu').style.display = 'block';
    }
});

document.getElementById('settings').onclick = function() {
    let menu = document.getElementById('menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
};

async function sendMessage() {
    let userInput = document.getElementById('userInput').value;
    if (!userInput) return;

    let chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById('userInput').value = '';

    let response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBEVgPdNDVJM4NV4Ze2oxSiENLsl2TjKCk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "contents": [{ "parts": [{ "text": userInput }] }] })
    });

    let data = await response.json();
    let botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond.";
    chatbox.innerHTML += `<p><strong>AI GF:</strong> ${botReply}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;
}
