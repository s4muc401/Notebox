const localStorageToDoKey = "todo-bank";
const localStorageLineKey = "line-bank";

let passwordStorageKey = localStorage.password;
const password = (localStorage.password) ? passwordStorageKey : "";

const boardPassword = document.getElementById("board-password");
const boardSettings = document.getElementById("board-settings");
const boardAddTask = document.getElementById("board-add-task");
const boardAddLine = document.getElementById("board-add-line");
const boardTasks = document.getElementById("board-todo");
const boardLine = document.getElementById("board-line");
const footerNavBar = document.querySelector("footer");
const btAdd = document.getElementById("btn-add");

// Board Password
const enterPassword = () => {
    let inputPassword = document.getElementById("input-enter-password");
    let correctOrNotPassword = (inputPassword.value == password) ? true : false;
    if (correctOrNotPassword) {
        footerNavBar.style.display = "block";
        btAdd.style.display = "block";
        boardTasks.style.display = "block";
        boardPassword.style.display = "none";
    } else {
        boardPassword.innerHTML = `<p style="color:red;">Senha Incorreta</p>`;
    }
}

// Lock System
function lockSystem() {
    location.reload();
}

// Board Settings
let inputOldPassword = document.getElementById("input-password");
let inputNewPassword = document.getElementById("input-set-password");

const openSettings = () => {
    boardTasks.style.display = "none";

    const existsPassword = (localStorage.password) ? "block" : "none";
    inputOldPassword.style.display = existsPassword;
    console.log(inputOldPassword.style.display)
    if (boardPassword.style.display != "none") { // BoardPassword in display block
        console.log("Settings Acess -> NEGADO")
    } else {
        let status = (boardSettings.style.display == "block") ? "none" : "block";
        boardSettings.style.display = status;   
    }
}

const setPassword = () => {
    if (inputOldPassword.value == password) {
        console.log("New Password: " + inputNewPassword.value)
        localStorage.password = inputNewPassword.value;
        inputNewPassword.value = "";
        inputOldPassword.value = "";
        boardTasks.style.display = "block";
        boardSettings.style.display = "none";
    } else {
        boardSettings.innerHTML += `<p style="color:red;margin-top:10px;">Senha Incorreta</p>`;
    }
}



// SYSTEM TODO
function openToDo() {
    boardTasks.style.display = "block";
    btAdd.style.display = "block";
    boardAddTask.style.display = "none";
    boardAddLine.style.display = "none";
    boardSettings.style.display = "none";
}

function newTask() {
    let input = document.getElementById("input-new-task");

    if (!input.value) {
        alert("Digite algo...")
    }
    else if (validadeIfExistNewTask()) {
        alert("Ja existe uma Task com essa descrição");
    }
    else {
        boardAddTask.style.display = "none";
        boardTasks.style.display = "block";
        btAdd.style.display = "block";

        let values = JSON.parse(localStorage.getItem(localStorageToDoKey) || "[]");
        values.push({
            name: input.value,
        });
        localStorage.setItem(localStorageToDoKey, JSON.stringify(values));
        showValues();
        input.value = "";
    }
}

function validadeIfExistNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageToDoKey) || "[]");
    let input = document.getElementById("input-new-task");
    let exists = values.find(x => x.name == input.value);
    return !exists ? false : true;
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageToDoKey) || "[]");
    boardTasks.innerHTML = "";
    for (let i = 0; i < values.length; i++) {
        boardTasks.innerHTML += `<textarea style="height:${values[i]['height'] + "px"};background-color:${values[i]['color']};border-color:${values[i]['color']};margin-bottom: 5px;">${values[i]['name']}</textarea><button onclick='removeItem("${values[i]['name']}")' style="height:${values[i]['height'] + "px"};"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" /></svg></button>`;
    }
}

function removeItem(data) {
    // A ultima função Ethel
    let values = JSON.parse(localStorage.getItem(localStorageToDoKey) || "[]");
    let index = values.findIndex(x => x.name == data);
    values.splice(index, 1);
    localStorage.setItem(localStorageToDoKey, JSON.stringify(values));
    showValues();
}

function openBoardAdd() {
    btAdd.style.display = "none";
    if (boardTasks.style.display == "block") {
        boardAddTask.style.display = "block";
        boardTasks.style.display = "none";
        boardLine.style.display = "none";
    } else if (boardLine.style.display == "block") {
        boardAddLine.style.display = "block";
        boardLine.style.display = "none";
        boardTasks.style.display = "none";
    }
}

showValues();

// SYSTEM LIST 
function openLine() {
    boardLine.style.display = "block";
    btAdd.style.display = "block";
    boardAddLine.style.display = "none";
    boardAddTask.style.display = "none";
    boardTasks.style.display = "none";
    boardSettings.style.display = "none";
    showLineValues();
}

function newBlock() {
    let input = document.getElementById("input-name-meta");

    if (!input.value) {
        alert("Digite algo...")
    }
    else if (validadeIfExistNewMeta()) {
        alert("Este titulo já está em uso");
    }
    else { 
        boardAddLine.style.display = "none";
        boardLine.style.display = "block";
        btAdd.style.display = "block";

        let values = JSON.parse(localStorage.getItem(localStorageLineKey) || "[]");
        values.push({
            title: input.value,
        });
        localStorage.setItem(localStorageLineKey, JSON.stringify(values));
        showLineValues();
        input.value = ""; 
    }
}

function validadeIfExistNewMeta() {
    let values = JSON.parse(localStorage.getItem(localStorageLineKey) || "[]");
    let input = document.getElementById("input-name-meta");
    let exists = values.find(x => x.title == input.value);
    return !exists ? false : true;
}

function showLineValues() {
    let values = JSON.parse(localStorage.getItem(localStorageLineKey) || "[]");
    boardLine.innerHTML = "";
    for (let i = 0; i < values.length; i++) {
        boardLine.innerHTML += `<textarea id='boxMeta'>${values[i]['title']}</textarea> <button onclick='removeLineItem("${values[i]['title']}")'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" /></svg>`;
    }
}

function removeLineItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageLineKey) || "[]");
    let index = values.findIndex(x => x.title == data);
    values.splice(index, 1);
    localStorage.setItem(localStorageLineKey, JSON.stringify(values));
    showLineValues();
}

