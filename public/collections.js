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
  const addCollection = document.getElementById("add-collection");
  collectionsTable = document.getElementById("collections-table");
  collectionsTableHeader = document.getElementById("collections-table-header");

  collectionsDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addCollection) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        setToken(null);
        message.textContent = "You have been logged off.";
        collectionsTable.replaceChildren([collectionsTableHeader]);
        showLoginRegister();
      } else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id);
      }
    }
  });
};

export const showCollections = async () => {
  try {
    enableInput(false);
    const response = await fetch("/api/v1/collections", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    let children = [collectionsTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        collectionsTable.replaceChildren(...children); // clear this for safety
      } else {
        for (let i = 0; i < data.collections.length; i++) {
          let rowEntry = document.createElement("tr");
          let editButton = `<td><button type="button" class="editButton" data-id=${data.collections[i]._id}>edit</button></td>`;
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.collections[i]._id}>delete</button></td>`;
          let rowHTML = `
            <td>${data.collections[i].name}</td>
            <td>${data.collections[i].painting}</td>
            <td>${data.collections[i].available}</td>
            <div>${editButton}${deleteButton}</div>`;
          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        collectionsTable.replaceChildren(...children);
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
  setDiv(collectionsDiv);
};
