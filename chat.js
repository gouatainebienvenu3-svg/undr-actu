const firebaseConfig = {
    apiKey: "AIzaSyDSkTikU8RuyY0sr7u_o5NS3Qjo6pRAXrk",
    authDomain: "undr---actu.firebaseapp.com",
    projectId: "undr---actu",
    storageBucket: "undr---actu.firebasestorage.app",
    messagingSenderId: "656535965389",
    appId: "1:656535965389:web:ef15df982f657e98b9e384"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
window.db = db;

const chatMessages = document.getElementById("chat-messages");
const chatPseudo = document.getElementById("chat-pseudo");
const chatMessageInput = document.getElementById("chat-message");
const chatEnvoyer = document.getElementById("chat-envoyer");

db.collection("messages")
    .orderBy("date", "asc")
    .limit(50)
    .onSnapshot(function(snapshot) {
        chatMessages.innerHTML = "";
        snapshot.forEach(function(doc) {
            const msg = doc.data();
            const div = document.createElement("div");
            div.className = "chat-msg";
            div.innerHTML = `<strong>${msg.pseudo} :</strong> ${msg.texte}`;
            chatMessages.appendChild(div);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

chatEnvoyer.addEventListener("click", function() {
    const pseudo = chatPseudo.value.trim() || "Anonyme";
    const texte = chatMessageInput.value.trim();
    if (texte === "") return;

    db.collection("messages").add({
        pseudo: pseudo,
        texte: texte,
        date: firebase.firestore.FieldValue.serverTimestamp()
    });

    chatMessageInput.value = "";
});