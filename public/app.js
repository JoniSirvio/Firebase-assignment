import { firebaseConfig } from "./firebaseconfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

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

    const sortedNotes = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate());

    sortedNotes.forEach((note) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.textContent = note.text;

        noteList.appendChild(noteDiv);
    });
});
