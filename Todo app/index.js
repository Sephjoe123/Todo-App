var add = document.getElementById("add");
var ul = document.getElementById("list-items");
var tasks = document.getElementById("tasks");
var inputList = document.getElementById("input-lists");
var refresh = document.getElementById("refresh");
var filter = document.getElementById("filter");


inputList.style.display = "none";

add.addEventListener("click",addItems);

function addItems(e){
  var input = document.getElementById("input").value;
  if(input === ""){
    alert("please enter a valid list")
  }
else{
  var list = document.createElement("li");
  list.className = "list-elements";
  list.appendChild(document.createTextNode(input))
  var deleteBtn = document.createElement("i");
  deleteBtn.className = "fa-solid fa-trash";
  list.appendChild(deleteBtn);
  ul.appendChild(list);
} 


// refresh list
refresh.addEventListener("click",refreshList);
function refreshList(e){
 if(e.target === refresh){
 ul.removeChild(list);
 refresh.style.transform = "rotate(90deg)";
 }

 else return ul.style.display = "block";
}

// remove individual list items
ul.addEventListener("click",removeList);
function removeList(e){
  if(e.target === deleteBtn){
    if(confirm("Are you sure ?"))
    deleteBtn.parentElement.remove();
  }
}
return deleteBtn;
}

// remove texts after beign submitted;
function removeText(){
 if(input !== ""){
  input.value = "";
 }
}
add.addEventListener("click",removeText)
// remove items after clicking deleteBtn

// rotate back
refresh.addEventListener("mouseleave",rotateBack)

function rotateBack(){
  refresh.style.transform = "rotate(-90deg)";
  refresh.style.transition = "all .6s";
}

// filter list items on search

filter.addEventListener("keyup",Filter)

function Filter(e){
var filterContent = e.target.value.toUpperCase();
var listItems = ul.querySelectorAll(".list-elements");
Array.from(listItems).forEach(function(Lists){
let inputItems = Lists.firstChild.textContent;
if(inputItems.toUpperCase().indexOf(filterContent) != -1){
  Lists.style.display = "";
}
else{
  Lists.style.display = "none";
  inputList.parentElement.remove();
}
})
}
