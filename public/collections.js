import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let collectionsDiv = null;
let collectionsTable = null;
let collectionsTableHeader = null;

export const handleCollections = () => {
  collectionsDiv = document.getElementById("collections");
  const logoff = document.getElementById("logoff");
  const addJob = document.getElementById("add-collection");
  collectionsTable = document.getElementById("collections-table");
  collectionsTableHeader = document.getElementById("collections-table-header");

  jobsDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addJob) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        showLoginRegister();
      }
    }
  });
};

export const showCollections = async () => {
  setDiv(collectionsDiv);
};
