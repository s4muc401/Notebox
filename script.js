// Chaves de UPload de dados na localStorage
const localStorageLineKey = "line-bank";

// Principais elementos HTML
const boardAddLine = document.getElementById("board-add-line");
const boardLine = document.getElementById("board-line");
const footerNavBar = document.querySelector("footer");
const btAdd = document.getElementById("btn-add");

// SYSTEM BLOCK

// Elementos Html do sistema de blocos
let inputTitle = document.getElementById("input-name-meta");
let inputContent = document.getElementById("input-content-boxmeta");

function openBoardAdd() {
    btAdd.style.display = "none";
    boardAddLine.style.display = "block";
    boardLine.style.display = "none";
}

// Criando um novo bloco 
function newBlock() {
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
        values.unshift({
            title: inputTitle.value,
            content: inputContent.value,
        });
        localStorage.setItem(localStorageLineKey, JSON.stringify(values));
        showLineValues();
        inputTitle.value = inputContent.value = ""; 
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
        buttonRemoveBoxMeta.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
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

// Função para abertura de blocos
function openBoxMeta(title,content) {
    boardAddLine.style.display = "block";
    boardLine.style.display = "none";

    inputTitle.value = title;
    inputContent.value = content;
    // SEGURANÇA: Salvamento de dados 
    navigator.clipboard.writeText(content);
}

// Excluindo bloco
function removeLineItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageLineKey) || "[]");
    let index = values.findIndex(x => x.title == data);
    values.splice(index, 1);
    localStorage.setItem(localStorageLineKey, JSON.stringify(values));
    showLineValues();
}

window.addEventListener("load",showLineValues);