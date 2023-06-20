let addToListBtn = document.getElementById("add");
let ul = document.getElementById("list-items");
let tasks = document.getElementById("tasks");
let refreshIcon = document.getElementById("refresh");
let filter = document.getElementById("filter");
let input = document.getElementById("input");
let taskLeft = document.querySelector(".taskLeft");

let listArray;
let liValue;
let finalLength;

addToListBtn.addEventListener("click", addToList);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addToList();
  }
});

function addToList() {
  let inputValue = input.value.trim();
  inputValue.trim();
  if (inputValue !== "") {
    let li = document.createElement("li");
    li.textContent = inputValue;
    ul.appendChild(li);

    let trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash";
    li.appendChild(trashIcon);
    clearInputField();

    let liValue = ul.querySelectorAll("li");
    listArray = Array.from(liValue);
    taskLeft.innerHTML = `
    You have ${listArray.length} task(s) to complete
    `;

    trashIcon.addEventListener("click", (e) => {
      if (e.target === trashIcon) {
        li.remove();
        listArray.pop();
        finalLength = listArray.length;
        taskLeft.innerHTML = `
        You have ${finalLength} task(s) to complete
       `;
      }
    });
  } else {
    alert("Please enter a valid input");
  }
}

function clearInputField() {
  if (input.value !== "") {
    input.value = "";
  }
}

refreshIcon.addEventListener("click", () => {
  if (ul.innerHTML !== "") {
    refreshIcon.style.rotate = "90deg";
    refreshIcon.style.transition = "0.5s";
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
let inputValue = input.value;
let inputLength = inputValue.length;

if(inputLength > 36){
  inputValue = inputValue.slice(0,inputLength);
  input.value = inputValue;
  alert("Maximum character reached")
}
}

filter.addEventListener("input", () => {
  let filterValue = filter.value;
  let listElements = Array.from(ul.querySelectorAll("li"));
 
  let matchedElementsCount = 0;

  listElements.forEach((item) => {
    let textToBeCompared = item.innerText;
    let firstLetter = textToBeCompared[0];

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
