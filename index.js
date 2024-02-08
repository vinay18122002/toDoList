let tasks = [];
let inputTag = document.getElementById("input-tag");
let plusIcon = document.getElementById("plus-icon");
let itemsContainer = document.getElementsByClassName("items-container")[0];
let done = false;
function updateListOnDom() {
  itemsContainer.innerHTML = "";
  tasks.forEach((element, index) => {
    let text = element.content;
    let child = document.createElement("div");
    child.classList.add("item");
    child.style.cursor = "pointer";
    child.addEventListener("dblclick", (event) => toggleDone(event));
    child.setAttribute("id", `${index}`);
    child.innerHTML = `
      <p id="p-tag" >${text}</p>
      <img src="./doneIcon.png" alt="" srcset="" class="done-icon" width="30px" style="display:none">
      <div class="icons-container">
      <img src="./tickIcon.png" alt="" srcset="" class="tick-icon" onclick="saveItem(event)">
        <img src="./editIcon.png" class="edit-icon" alt="" srcset="" onclick="editItem(event)">
        <img src="./deleteIcon.png" class="delete-icon" alt="" onclick="deleteItem(event)">
      </div>
    `;
    if (element.done == true) {
      let h3tag = child.querySelector("p");
      h3tag.style.textDecoration = "line-through";
      let icons = Array.from(child.getElementsByTagName("img"));
      for (let i = 0; i < icons.length; i++) {
        if (i == 1 || i == icons.length - 1) {
          continue;
        }
        icons[i].style.display = "block";
      }
    }
    itemsContainer.appendChild(child);
  });
}
function addItem() {
  let text = inputTag.value.trim();
  const containsOnlySpaces = /^\s*$/.test(text);

  if (text.length > 0 && !containsOnlySpaces) {
    tasks.push({ content: text, done: false });
    inputTag.value = "";
    updateListOnDom();
  }
}
function deleteItem(event) {
  let topParentDiv = event.currentTarget.parentNode.parentNode;
  let index = parseInt(topParentDiv.id);
  tasks.splice(index, 1);
  updateListOnDom();
}

function editItem(event) {
  let topParentDiv = event.currentTarget.parentNode.parentNode;
  let editTag = topParentDiv.querySelector(".edit-icon");
  editTag.style.display = "none";

  let tickTag = topParentDiv.querySelector(".tick-icon");
  tickTag.style.display = "block";

  let h3tag = topParentDiv.querySelector("p");
  let h3Text = h3tag.innerText;
  let inputElement = document.createElement("input");
  inputElement.value = h3Text;
  topParentDiv.replaceChild(inputElement, h3tag);
  console.log(h3tag.innerText);
}
function saveItem(event) {
  let topParentDiv = event.currentTarget.parentNode.parentNode;
  let inputTag = topParentDiv.getElementsByTagName("input")[0];
  let inputTag_text = inputTag.value;

  let newH3_tag = document.createElement("p");
  newH3_tag.setAttribute("id", "p-tag");
  newH3_tag.innerText = inputTag_text;
  topParentDiv.replaceChild(newH3_tag, inputTag);

  // update the array also
  let index = parseInt(topParentDiv.id);
  tasks[index].content = inputTag_text;

  // make edit icon visible and hide tick-icon
  let editTag = topParentDiv.querySelector(".edit-icon");
  editTag.style.display = "block";

  let tickTag = topParentDiv.querySelector(".tick-icon");
  tickTag.style.display = "none";
}
function toggleDone(event) {
  let taskItem = event.currentTarget;
  let index = parseInt(taskItem.id);
  let doneIcon = taskItem.querySelector(".done-icon");
  let icons = Array.from(taskItem.getElementsByTagName("img"));
  let h3tag = taskItem.querySelector("p");

  if (!tasks[index].done) {
    h3tag.style.textDecoration = "line-through";
    for (let i = 0; i < icons.length - 1; i++) {
      icons[i].style.display = "none";
    }

    // adding the done-icon and making it true
    doneIcon.style.display = "block";
    tasks[index].done = true;
  } else {
    h3tag.style.textDecoration = "none";
    for (let i = 2; i < icons.length - 1; i++) {
      icons[i].style.display = "block";
    }

    // removing the done icon
    doneIcon.style.display = "none";
    tasks[index].done = false;
  }
}
plusIcon.addEventListener("click", addItem);
