import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showCollections } from "./collections.js";

let addEditDiv = null;
let name = null;
let painting = null;
let available = null;
let addingCollection = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-collection");
  name = document.getElementById("name");
  painting = document.getElementById("painting");
  available = document.getElementById("available");
  addingCollection = document.getElementById("adding-collection");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingCollection) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/collections";

        if (addingCollection.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/collections/${addEditDiv.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: name.value,
              painting: painting.value,
              available: available.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = "The job entry was updated.";
            } else {
              // a 201 is expected for a successful create
              message.textContent = "The job entry was created.";
            }

            company.value = "";
            position.value = "";
            status.value = "pending";
            showJobs();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }
        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showCollections();
      }
    }
  });
};

export const showAddEdit = async (collectionId) => {
  if (!collectionId) {
    name.value = "";
    painting.value = "";
    available.value = "onsite";
    addingCollection.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);
    try {
      const response = await fetch(`/api/v1/collections/${collectionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        name.value = data.collection.name;
        painting.value = data.collection.painting;
        available.value = data.collection.available;
        addingCollection.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = collectionId;
        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The collections entry was not found";
        showCollections();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showCollections();
    }
    enableInput(true);
  }
};
