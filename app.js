const addFirstNoteButton = document.getElementById("no-notes-button");
const addNewNoteForm = document.getElementById("add-new-note-form");
const addNewNoteCancelButton = document.getElementById("add-new-note-cancel");

toggleAddNoteMenu = () => {
  const isMenuVisible = addNewNoteForm.style.display === "flex";

  addNewNoteForm.style.display = isMenuVisible ? "none" : "flex";
};

addNote = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formValues = Object.fromEntries(formData);
  formValues.id = Math.floor(Math.random() * 1000000000);

  toggleAddNoteMenu();
};

addFirstNoteButton.addEventListener("click", toggleAddNoteMenu);
addNewNoteCancelButton.addEventListener("click", toggleAddNoteMenu);
addNewNoteForm.addEventListener("submit", addNote);
