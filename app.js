const addFirstNoteButton = document.getElementById("no-notes-button");
const editNoteForm = document.getElementById("edit-note-form");
const editNoteTitle = document.getElementById("edit-note-title");
const editNoteDetails = document.getElementById("edit-note-details");
const editNoteCancel = document.getElementById("edit-note-cancel");
const editNoteMenuLabel = document.getElementById("edit-note-menu-label");
const notes = document.getElementById("notes");

const notesData = [];
let editedNote = null;

const toggleNoteMenu = (_, note) => {
  const isOpeningMenu = editNoteForm.style.display !== "flex";

  if (isOpeningMenu) {
    if (note) {
      editNoteMenuLabel.textContent = "Edit note";
      editedNote = note;
      updateNoteForm(note);
    } else {
      editNoteMenuLabel.textContent = "Add new note";
    }
  } else {
    editedNote = null;
    updateNoteForm({ title: "", details: "" });
  }

  editNoteForm.style.display = isOpeningMenu ? "flex" : "none";
};

const updateNotesView = () => {
  notes.innerHTML = "";

  notesData.forEach((note) => {
    const noteListElement = document.createElement("li");
    noteListElement.className = "note";

    const month = note.date.toLocaleString("default", { month: "long" });
    const day = note.date.getDate();

    const noteContent = `
        <div class="note-header">
            <p class="note-title">${note.title}</p>
            <div class="note-buttons">
                <button class="note-button" name="edit-note">
                    <img src="icons/edit.svg" alt="Edit note - Three lines with pencil" width="20" height="20" />
                </button>
                <button class="note-button" name="remove-note">
                    <img src="icons/trash-bin.svg" alt="Remove note - Trash bin" width="20" height="20" />
                </button>
            </div>
        </div>
        <p class="note-details">${note.details}</p>
        <p class="note-date">${month} ${day}</p>
        `;

    noteListElement.innerHTML = noteContent;

    const editButton = noteListElement.querySelector("[name='edit-note']");
    editButton.addEventListener("click", function () {
      toggleNoteMenu(null, note);
    });

    const removeButton = noteListElement.querySelector("[name='remove-note']");
    removeButton.addEventListener("click", function () {
      removeNote(note.id);
    });

    notes.appendChild(noteListElement);
  });
};

const updateNoteForm = (note) => {
  editNoteTitle.value = note.title;
  editNoteDetails.value = note.details;
};

const updateNote = (event) => {
  event.preventDefault();

  const formValues = Object.fromEntries(new FormData(event.target));
  formValues.date = new Date();

  if (editedNote) {
    const editedNoteIdx = notesData.findIndex(
      ({ id }) => id.toString() === editedNote.id.toString()
    );
    formValues.id = editedNote.id;

    notesData[editedNoteIdx] = formValues;
    editedNote = null;
  } else {
    formValues.id = Math.floor(Math.random() * 1000000000);

    notesData.push(formValues);
  }

  updateNotesView();
  toggleNoteMenu();
};

const removeNote = (noteId) => {
  const noteIdx = notesData.findIndex(
    ({ id }) => id.toString() === noteId.toString()
  );

  notesData.splice(noteIdx, 1);
  updateNotesView();
};

addFirstNoteButton.addEventListener("click", toggleNoteMenu);
editNoteCancel.addEventListener("click", toggleNoteMenu);
editNoteForm.addEventListener("submit", updateNote);
