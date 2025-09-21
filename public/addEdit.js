import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showCollections } from "./collections.js";

let addEditDiv = null;
let painting = null;
let genre = null;
let availbale = null;
let addingCollection = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-collection");
  painting = document.getElementById("painting");
  genre = document.getElementById("genre");
  availbale = document.getElementById("availbale");
  addingJob = document.getElementById("adding-collection");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingCollection) {
        showCollections();
      } else if (e.target === editCancel) {
        showCollections();
      }
    }
  });
};

export const showAddEdit = (colelction) => {
  message.textContent = "";
  setDiv(addEditDiv);
};
