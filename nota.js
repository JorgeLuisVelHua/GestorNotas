document.addEventListener("DOMContentLoaded", function() {
    loadNotes();
});

function addNote() {
    const noteInput = document.getElementById("note-input");
    const noteText = noteInput.value.trim();

    if (noteText !== "") {
        const noteList = document.getElementById("note-list");

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${noteText}</span>
            <button onclick="deleteNote(this)">Eliminar</button>
        `;

        noteList.appendChild(li);
        saveNoteToLocalStorage(noteText);

        // Limpiar el campo de entrada
        noteInput.value = "";
    }
}

function deleteNote(button) {
    const li = button.parentElement;
    const noteText = li.querySelector("span").innerText;

    // Mostrar una confirmación antes de eliminar la nota
    const isConfirmed = confirm(`¿Seguro que deseas eliminar la nota: "${noteText}"?`);

    if (isConfirmed) {
        // Eliminar la nota
        li.remove();

        // Eliminar de localStorage
        deleteNoteFromLocalStorage(noteText);
    }
}

function saveNoteToLocalStorage(note) {
    let notes = getNotesFromLocalStorage();
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function deleteNoteFromLocalStorage(note) {
    let notes = getNotesFromLocalStorage();
    notes = notes.filter(item => item !== note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    let notes = getNotesFromLocalStorage();
    const noteList = document.getElementById("note-list");

    notes.forEach(note => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${note}</span>
            <button onclick="deleteNote(this)">Eliminar</button>
        `;
        noteList.appendChild(li);
    });
}

function getNotesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("notes")) || [];
}
