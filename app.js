const addFirstNoteButton = document.getElementById("no-notes-button");
const addNewNoteForm = document.getElementById("add-new-note-form");
const addNewNoteCancelButton = document.getElementById("add-new-note-cancel");
const notes = document.getElementById("notes");

toggleAddNoteMenu = () => {
  const isMenuVisible = addNewNoteForm.style.display === "flex";

  addNewNoteForm.style.display = isMenuVisible ? "none" : "flex";
};

addNote = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formValues = Object.fromEntries(formData);
  formValues.date = new Date();
  formValues.id = Math.floor(Math.random() * 1000000000);
  console.log("Note: ", formValues);

  createNoteElement(formValues);
  toggleAddNoteMenu();
};

const createNoteElement = ({ title, details, date }) => {
  const noteListElement = document.createElement("li");
  noteListElement.className = "notes-note";

  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  const noteContent = `
        <div class="notes-note-header">
            <span class="notes-note-title">${title}</span>
            <div class="notes-note-buttons">
                <button class="notes-note-button">
                    <img src="icons/edit.svg" alt="Edit note - Three lines with pencil" width="20" height="20" />
                </button>
                <button class="notes-note-button">
                    <img src="icons/trash-bin.svg" alt="Remove note - Trash bin" width="20" height="20" />
                </button>
            </div>
        </div>
        <span class="notes-note-details">${details}</span>
        <span class="notes-note-date">${month} ${day}</span>
        `;

  noteListElement.innerHTML = noteContent;
  notes.appendChild(noteListElement);
};

addFirstNoteButton.addEventListener("click", toggleAddNoteMenu);
addNewNoteCancelButton.addEventListener("click", toggleAddNoteMenu);
addNewNoteForm.addEventListener("submit", addNote);
