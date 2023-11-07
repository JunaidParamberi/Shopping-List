import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-63da0-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const itemsUlEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDB, inputValue);

  clearInput();
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArr = Object.entries(snapshot.val());
    clearShoppingList();
    for (let i = 0; i < itemsArr.length; i++) {
      let currentItems = itemsArr[i];
      let currentItemsId = currentItems[0];
      let currentItemsValues = currentItems[1];

      addItemToShoppimgList(currentItems);
    }
  } else {
    itemsUlEl.innerHTML = "No items here...yet";
  }
});

function clearShoppingList() {
  itemsUlEl.innerHTML = "";
}

function clearInput() {
  inputFieldEl.value = "";
}

function addItemToShoppimgList(item) {
  let itemId = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationItemInDb = ref(database, `shoppingList/${itemId}`);
    remove(exactLocationItemInDb);
  });

  itemsUlEl.append(newEl);
}
