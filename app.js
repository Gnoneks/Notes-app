const noNotesSection = document.getElementById("no-notes-section");
const searchBar = document.getElementById("search-bar-input");
const addNoteButtons = document.getElementsByName("add-note-button");
const addNextNoteButton = document.getElementById("add-next-note-button");
const editNoteForm = document.getElementById("edit-note-form");
const editNoteTitle = document.getElementById("edit-note-title");
const editNoteDetails = document.getElementById("edit-note-details");
const editNoteCancel = document.getElementById("edit-note-cancel");
const editNoteMenuLabel = document.getElementById("edit-note-menu-label");
const notes = document.getElementById("notes");
const dialog = document.getElementById("dialog");
const dialogCloseButton = document.getElementById("dialog-close");
const dialogConfirm = document.getElementById("dialog-confirm");

const notesData = [];

let editedNote = null;
let removedNoteId = null;

const searchNotes = (event) => {
  const searchPhrase = event.target.value.toLowerCase().trim();

  updateNotesView(
    notesData.filter((note) => note.title.toLowerCase().includes(searchPhrase))
  );
};

const toggleNoteMenu = (_, note) => {
  const isOpeningMenu = editNoteForm.style.display !== "flex";

  if (isOpeningMenu) {
    noNotesSection.style.display = "none";
    addNextNoteButton.style.display = "none";
    editNoteMenuLabel.textContent = "Add new note";

    if (note) {
      editNoteMenuLabel.textContent = "Edit note";
      editedNote = note;
      updateNoteForm(note);
    }
  } else {
    if (notesData.length) {
      addNextNoteButton.style.display = "flex";
    } else {
      noNotesSection.style.display = "flex";
    }

    editedNote = null;
    updateNoteForm({ title: "", details: "" });
  }

  editNoteForm.style.display = isOpeningMenu ? "flex" : "none";
};

const updateNotesView = (notesList) => {
  notes.innerHTML = "";

  notesList.forEach((note) => {
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
      openRemoveDialog(note.id);
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

  updateNotesView(notesData);
  toggleNoteMenu();
};

const openRemoveDialog = (noteId) => {
  removedNoteId = noteId;

  dialog.showModal();
};

const removeNote = () => {
  const noteIdx = notesData.findIndex(
    ({ id }) => id.toString() === removedNoteId.toString()
  );

  notesData.splice(noteIdx, 1);

  if (!notesData.length) {
    noNotesSection.style.display = "flex";
    addNextNoteButton.style.display = "none";
  }

  removedNoteId = null;
  dialog.close();
  updateNotesView(notesData);
};

searchBar.addEventListener("input", searchNotes);
addNoteButtons.forEach((button) =>
  button.addEventListener("click", toggleNoteMenu)
);
editNoteCancel.addEventListener("click", toggleNoteMenu);
editNoteForm.addEventListener("submit", updateNote);
dialogCloseButton.addEventListener("click", function () {
  dialog.close();
});
dialogConfirm.addEventListener("click", removeNote);
