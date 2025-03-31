import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDdzpB9RIjmqlbY7JCiyU7jVt9D8Gi47QE",
    authDomain: "fir-assignment-a5bae.firebaseapp.com",
    projectId: "fir-assignment-a5bae",
    storageBucket: "fir-assignment-a5bae.appspot.com",
    messagingSenderId: "68096552344",
    appId: "1:68096552344:web:df7f8f1e83170ad7448fed",
    measurementId: "G-4506J7FCGG"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const noteRef = collection(db, "Notes");

async function addNote() {
    const noteInput = document.getElementById("noteInput").value;
    if (noteInput.trim() === "") return;

    await addDoc(noteRef, { text: noteInput, timestamp: new Date() });
    document.getElementById("noteInput").value = "";
}

window.addNote = addNote;

onSnapshot(noteRef, (snapshot) => {
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = "";
    snapshot.docs.forEach((doc) => {
        const li = document.createElement("li");
        li.textContent = doc.data().text;
        noteList.appendChild(li);
    });
});