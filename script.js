// Chaves de UPload de dados na localStorage
const localStorageLineKey = "line-bank";

// Pegando senha na localStorage e checando sua existencia
let passwordStorageKey = localStorage.password;
const password = (localStorage.password) ? passwordStorageKey : "";

// Principais elementos HTML
const boardPassword = document.getElementById("board-password");
const boardSettings = document.getElementById("board-settings");
const boardAddLine = document.getElementById("board-add-line");
// teste
const sectionNewboxMeta = document.querySelector(".section-new-boxmeta");
const sectionNewDivision = document.querySelector(".section-new-division");
const divisionList = document.querySelector(".division-list");
const boardLine = document.getElementById("board-line");
const footerNavBar = document.querySelector("footer");
const btAdd = document.getElementById("btn-add");

// Board Password - Liberação de acesso ao Sistema
const enterPassword = () => {
    let inputPassword = document.getElementById("input-enter-password");
    let correctOrNotPassword = (inputPassword.value == password) ? true : false;
    if (correctOrNotPassword) {
        footerNavBar.style.display = "block";
        btAdd.style.display = "block";
        boardLine.style.display = "block";
        boardPassword.style.display = "none";
        showLineValues();
    } else {
        boardPassword.innerHTML = `<p style="color:red;">Senha Incorreta</p>`;
    }
}

// Lock System - Função de Travamento
function lockSystem() {
    location.reload();
}

// Board Settings
let inputOldPassword = document.getElementById("input-password"); // Modificando a senha de acesso ao sistema
let inputNewPassword = document.getElementById("input-set-password");

// Abrindo caixa de configurações
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

// Função de Troca de senha de acesso
const setPassword = () => {
    if (inputOldPassword.value == password) {
        console.log("New Password: " + inputNewPassword.value)
        localStorage.password = inputNewPassword.value;
        inputNewPassword.value = "";
        inputOldPassword.value = "";
        boardLine.style.display = "block";
        boardSettings.style.display = "none";
    } else {
        boardSettings.innerHTML += `<p style="color:red;margin-top:10px;">Senha Incorreta</p>`;
    }
}

function openBoardAdd() {
    btAdd.style.display = "none";
    boardAddLine.style.display = "block";
    boardLine.style.display = "none";
}

// Elementos Html do sistema de blocos
let inputTitle = document.getElementById("input-name-meta");
let inputContent = document.getElementById("input-content-boxmeta");
let btnAddBox = document.querySelector("#btn-add-box");
let btnNewDivision = document.querySelector("#btn-new-division");
let btnAddDivision = document.querySelector("#btn-add-division");


btnAddDivision.addEventListener("click",()=>{
    createBoxAndDivision("createDivision");
});

btnAddBox.addEventListener("click",()=>{
    createBoxAndDivision("createBoxMeta");
});

function createBoxAndDivision(use) {
    if (use == "createBoxMeta") {
        if (!inputTitle.value) {
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
                title: inputTitle.value,
                content: inputContent.value,
            });
            localStorage.setItem(localStorageLineKey, JSON.stringify(values));
            showLineValues();
            inputTitle.value = inputContent.value = ""; 
        }
    } else if (use == "createDivision") {
        sectionNewDivision.style.display = "none";
        sectionNewboxMeta.style.display = "block";
        // btnNewDivision.style.display = "block";
    }
}

// Validando bloco
function validadeIfExistNewMeta() {
    let values = JSON.parse(localStorage.getItem(localStorageLineKey) || "[]");
    let exists = values.find(x => x.title == inputTitle.value);
    return !exists ? false : true;
}

// Carregando blocos
function showLineValues() {
    let values = JSON.parse(localStorage.getItem(localStorageLineKey) || "[]");
    boardLine.innerHTML = "";
    for (let iterator = 0; iterator < values.length; iterator++) {
        const boxMeta = document.createElement('div');
        boxMeta.setAttribute('id','boxMeta')

        const titleBoxMeta = document.createElement('p');
        titleBoxMeta.setAttribute('id','title-boxmeta')
        titleBoxMeta.innerHTML = `${values[iterator]['title']}`;

        const contentBoxMeta = document.createElement('div');
        contentBoxMeta.setAttribute('id','content-boxmeta');
        contentBoxMeta.innerHTML = `${values[iterator]['content']}`;

        const buttonRemoveBoxMeta = document.createElement('button');
        buttonRemoveBoxMeta.innerHTML = "Apagar";
        buttonRemoveBoxMeta.addEventListener('click',function(){
            removeLineItem(values[iterator]['title'])
        });

        boxMeta.appendChild(titleBoxMeta);
        boxMeta.appendChild(contentBoxMeta);
        boxMeta.appendChild(buttonRemoveBoxMeta);

        // Abrindo bloco
        contentBoxMeta.addEventListener("click",function(){
            let content = contentBoxMeta.textContent;
            openBoxMeta(values[iterator]['title'],content);
            btAdd.style.display = "none";
            removeLineItem(values[iterator]['title'])
        });

        boardLine.appendChild(boxMeta);

    }
}

function openSectionNewDivision() {
    sectionNewDivision.style.display = "block";
    sectionNewboxMeta.style.display = "none";
    btnNewDivision.style.display = "none";
}

// Função para abertura de blocos
function openBoxMeta(title,content) {
    boardAddLine.style.display = "block";
    boardLine.style.display = "none";

    inputTitle.value = title;
    inputContent.value = content;
}

// Excluindo bloco
function removeLineItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageLineKey) || "[]");
    let index = values.findIndex(x => x.title == data);
    values.splice(index, 1);
    localStorage.setItem(localStorageLineKey, JSON.stringify(values));
    showLineValues();
}

