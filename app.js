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
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  const noteContent = `
    <li class="notes-note">
        <div class="notes-note-data">
        <span class="notes-note=title">${title}</span>
        <span class="notes-note=details">${details}</span>
        <span class="notes-note=date">${month} ${day}</span>
        </div>
        <div class=notes-note-buttons>
            <button></button>
            <button></button>
        </div>
    </li>`;

  noteListElement.innerHTML = noteContent;
  notes.appendChild(noteListElement);
};

addFirstNoteButton.addEventListener("click", toggleAddNoteMenu);
addNewNoteCancelButton.addEventListener("click", toggleAddNoteMenu);
addNewNoteForm.addEventListener("submit", addNote);
