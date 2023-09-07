const addToListBtn = document.getElementById("add");
const ul = document.getElementById("list-items");
const tasks = document.getElementById("tasks");
const refreshIcon = document.getElementById("refresh");
const filter = document.getElementById("filter");
const input = document.getElementById("input");
const taskLeft = document.querySelector(".taskLeft");

const successModal = document.querySelector(".success-modal");
let functionRunning = true;

let listArray;
let liValue;
let finalLength;

let taskItem = JSON.parse(localStorage.getItem("taskItem")) || [];
if (!Array.isArray(taskItem)) {
  taskItem = [];
}
addToListBtn.addEventListener("click", addToList);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addToList();
  }
});

function addToList() {
  if (functionRunning) {
    const inputValue = input.value.trim();
    let firtstWord = inputValue[0].toUpperCase();
    let restOfWord = inputValue.slice(1);
    const FinalValue = firtstWord + restOfWord;

    taskItem.push(FinalValue);
    localStorage.setItem("taskItem", JSON.stringify(taskItem));

    createListItems();
    console.log(taskItem);

    if (FinalValue !== "") {
      clearInputField();
      functionRunning = false;
      successModal.style.display = "block";

      setTimeout(() => {
        functionRunning = true;
        successModal.style.display = "none";
      }, 2000);

      displayTaskLeft(ul);
    } else {
      alert("Please enter a valid input");
    }
  }
}

function clearInputField() {
  if (input.value !== "") {
    input.value = "";
  }
}

refreshIcon.addEventListener("click", () => {
  const todoList = JSON.parse(localStorage.getItem("tasks")) || [];

  if (ul.innerHTML !== "") {
    refreshIcon.style.rotate = "90deg";
    refreshIcon.style.transition = "0.5s";
    taskItem.length = 0;
    localStorage.setItem("taskItem", JSON.stringify(taskItem));
    ul.innerHTML = "";
    taskLeft.innerHTML = `
      You have 0 task(s) to complete
      `;

    setTimeout(() => {
      refreshIcon.style.rotate = "0deg";
      input.value = "";
    }, 1000);
  } else {
    return;
  }
});

input.addEventListener("input", controlInputLength);

function controlInputLength() {
  const inputValue = input.value;
  const inputLength = inputValue.length;

  if (inputLength > 36) {
    inputValue = inputValue.slice(0, inputLength);
    input.value = inputValue;
    alert("Maximum character reached");
  }
}

filter.addEventListener("input", () => {
  const filterValue = filter.value;
  const listElements = Array.from(ul.querySelectorAll("li"));
  const matchedElementsCount = 0;

  listElements.forEach((item) => {
    const textToBeCompared = item.innerText;
    const firstLetter = textToBeCompared[0];

    if (filterValue === "") {
      item.style.display = "block";
      matchedElementsCount++;
    } else if (firstLetter.indexOf(filterValue[0]) > -1) {
      item.style.display = "block";
      matchedElementsCount++;
    } else {
      item.style.display = "none";
    }
  });

  taskLeft.innerHTML = `You have ${matchedElementsCount} task(s) to complete`;
});

function moveToTop(ul, li) {
  ul.insertBefore(li, ul.firstChild);
}

function createListItems(FinalValue) {
  ul.innerHTML = "";
  taskItem.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    const editIcon = document.createElement("i");

    editIcon.className = "fa-solid fa-pen-to-square";
    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash";

    li.appendChild(trashIcon);
    li.appendChild(editIcon);

    ul.appendChild(li);
    deleteElement(trashIcon, li);
    moveToTop(ul, li);
    displayTaskLeft(ul);
    editAndUpdateItems(editIcon, li, trashIcon);
  });
}

window.onload = createListItems;

function displayTaskLeft(ul) {
  const liValue = ul.querySelectorAll("li");
  listArray = Array.from(liValue);

  taskLeft.innerHTML = `
  You have ${listArray.length} task(s) to complete
`;
}

function deleteElement(delBtn, li) {
  delBtn.addEventListener("click", () => {
    const itemText = li.textContent;
    const index = taskItem.indexOf(itemText);

    taskItem.splice(index, 1);
    li.remove();
    localStorage.setItem("taskItem", JSON.stringify(taskItem));
    taskLeft.innerHTML = `
   You have ${taskItem.length} task(s) to complete
 `;

  });
}
function editAndUpdateItems(editbtn, li, trashIcon) {
  editbtn.addEventListener("click", () => {
    if (li.querySelector(".savebtn") === null) {
      const savebtn = document.createElement("button");
      const cancelbtn = document.createElement("button");
       const itemText = li.textContent;
       const index = taskItem.indexOf(itemText);

      savebtn.className = "savebtn";
      cancelbtn.className = "cancelbtn";

      savebtn.innerText = "Save";
      cancelbtn.innerText = "Cancel";

      li.appendChild(savebtn);
      li.appendChild(cancelbtn);
      li.style.paddingBottom = "60px";
      li.contentEditable = "true";
       
    
      closeItems(li, cancelbtn, savebtn);
      saveAndUpdate(savebtn,li,index)

      const liItems = {
        cancel: cancelbtn, save: savebtn,edit: editbtn,  trash: trashIcon,
      };

      for (let key in liItems) {
        liItems[key].contentEditable = "false";
      }
    }
   
  });
  
}

function closeItems(li, cancel, save) {
  cancel.addEventListener("click", () => {
    li.removeChild(cancel);
    li.removeChild(save);
    li.style.paddingBottom = "12px";
    li.contentEditable = "false";
  });
}

function saveAndUpdate(savebtn, li, index) {
  savebtn.addEventListener("click", () => {
    let firstNode = li.childNodes[0];
    let textContent = firstNode.textContent.trim(); // Get the text content and remove leading/trailing whitespace
    taskItem.splice(index, 1, textContent);
    localStorage.setItem("taskItem", JSON.stringify(taskItem));
    console.log(taskItem);
    console.log(textContent);
  });
}
