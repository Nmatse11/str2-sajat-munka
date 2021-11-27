let userList = []
let keys = ["id", "name", "emailAddress", "address" ]
let modalPage = document.querySelector(".modal__page");
let modal = document.querySelector(".modal");
const nameRegex = /^[A-ZÁÉÍÓÚÖŐÜŰ]{1}[a-záéíóúöőüű]+\s[A-ZÁÉÍÓÚÖŐÜŰ]{1}[a-záéíóúöőüű]+(\s[A-ZÁÉÍÓÚÖŐÜŰ]{1}[a-záéíóúöőüű]+)*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}(\.[a-z]{2,3})*$/;
const addressRegex = /^\d+\s[A-ZÁÉÍÓÚÖŐÜŰ]{1}[a-záéíóúöőüű]+\s[A-ZÁÉÍÓÚÖŐÜŰ0-9]{1}[a-záéíóúöőüű]+(\s[A-ZÁÉÍÓÚÖŐÜŰ0-9]{1}[a-záéíóúöőüű]+)*$/; 
const nameRegexString = "^[A-ZÁÉÍÓÚÖŐÜŰ]{1}[a-záéíóúöőüű]+\\s[A-ZÁÉÍÓÚÖŐÜŰ]{1}[a-záéíóúöőüű]+(\\s[A-ZÁÉÍÓÚÖŐÜŰ]{1}[a-záéíóúöőüű]+)*$";
const emailRegexString = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}(\\.[a-z]{2,3})*$";
const addressRegexString = "^\\d+\\s[A-ZÁÉÍÓÚÖŐÜŰ]{1}[a-záéíóúöőüű]+\\s[A-ZÁÉÍÓÚÖŐÜŰ0-9]{1}[a-záéíóúöőüű]+(\\s[A-ZÁÉÍÓÚÖŐÜŰ0-9]{1}[a-záéíóúöőüű]+)*$"; 
const regex = [nameRegexString, emailRegexString, addressRegexString]

const getUsers = async (url = ' ') => {
  let fetchOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache'
  }
  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    return data;
  } catch (error) { 
    console.error('Error: ', error)
  }
};

  const createList = async () => {
    deleteTable();
    let list = await getUsers('http://localhost:3000/users/');
    userList = []
    for (let i = 0; i< list.length; i++) {
      userList.push(list[i])
    }
    userList.reverse()
    createTable();
    deleteClick();
    editClick();
  };
  
  window.onload = () => {
    createList();
    submitClick();
  }

  const createTable = () => {
    const table = document.querySelector('#userTable');
    const tBody = table.querySelector(".tbody");
    for (let i = 0; i < userList.length; i++) {
      const tr = document.createElement("tr");
      tr.classList.add("row");
      tBody.appendChild(tr);
     for (let j = 0; j < keys.length; j++) {
        const td = document.createElement("td");
        td.classList.add("item")
        tr.appendChild(td)
        const input = document.createElement("input");
        input.setAttribute("readonly", true);
        input.setAttribute("type", "text");
        input.value = Object.values(userList[i])[j];
        td.appendChild(input)
      }
      createButton();
    }
}

const createButton = () => {
  let rows = document.querySelectorAll(".row")
  const editBtn = document.createElement("button");
  editBtn.classList.add("editButton")
  editBtn.innerHTML = '<i class="fas fa-edit" aria-hidden="true"></i>';
  const delBtn = document.createElement("button");
  delBtn.classList.add("delButton")
  delBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  const saveBtn = document.createElement("button");
  saveBtn.classList.add("saveButton")
  saveBtn.innerHTML = '<i class="far fa-save" aria-hidden="true"></i>';
  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("cancelButton")
  cancelBtn.innerHTML = '<i class="far fa-window-close" aria-hidden="true"></i>';
  const td = document.createElement("td");
  for (let i = 0; i < rows.length; i++) {
    td.classList.add("buttons")
    td.appendChild(editBtn)
    td.appendChild(delBtn)
    td.appendChild(saveBtn)
    td.appendChild(cancelBtn)
    rows[i].appendChild(td)
  }
  createSize()
}

const createSize = () => {
  let rows = document.querySelectorAll(".row")
  for (let i = 0; i < rows.length; i++) {
  rows[i].children[0].firstChild.setAttribute('size', '1')
  rows[i].children[2].firstChild.setAttribute('size', '30')
}
}

const deleteTable = () => {
  const table = document.querySelector('#userTable');
  const tBody = table.querySelector(".tbody");
  tBody.textContent = ""
}

const deleteClick = () => {
  let delButtons = document.querySelectorAll(".delButton");
  for (let i = 0; i < delButtons.length; i++) {
    delButtons[i].addEventListener ('click', function () {
      if (!delButtons[i].classList.contains("delButton-op")) {
      let rows = document.querySelectorAll(".row");
      let id = rows[i].children[0].firstChild.value;
      fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(createList)
      .catch((error) => {console.error(error)})
    } else {
    modalOut();
    delSuccessMessage();
    let message = document.querySelector(".faultMessage");
    message.textContent="Please finish editing the current user!";
    modalHidden();
    }
    })
  }
}

const editClick = () => {
  let editButtons = document.querySelectorAll(".editButton");
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener ('click', function () {
     if (!editButtons[i].classList.contains("editButton-op")) {
      let rows = document.querySelectorAll(".row");
      rows[i].classList.remove("row")
      rows[i].classList.add("editTr")
      for (let j = 1; j < 4; j++) {
        rows[i].children[j].firstChild.removeAttribute('readonly')
        rows[i].children[j].firstChild.setAttribute('pattern', regex[j-1])
      };
      editRowButtonsHidden();
      buttonsDisabled();
      buttonsVisible(i);
    } else {
      modalOut();
      delSuccessMessage();
      let message = document.querySelector(".faultMessage");
      message.textContent="Please finish editing the current user!";
      modalHidden();
    }
    })
  }
  saveClick();
  cancelClick();
}

const modalOut = () => {
  modal.classList.add("animation-open");
  modal.style.display = "block";
  modalPage.style.display = "block";
  setTimeout (function () {
  modal.classList.remove("animation-open");
}, 1000);
}

const modalHidden = () => {
  setTimeout (function () {
    modal.classList.add("animation-close");
    setTimeout (function () {
      modal.style.display = "none";
      modalPage.style.display = "none";
      modal.classList.remove("animation-close");
  }, 1000);
}, 5000);
}


const editRowButtonsHidden = () => {
  let editRow = document.querySelector(".editTr");
  let hiddenEditBtn = editRow.querySelector('.editButton')
    hiddenEditBtn.classList.remove("editButton");
    hiddenEditBtn.classList.add("editButton-none");
  let hiddenDelBtn = editRow.querySelector('.delButton')
    hiddenDelBtn.classList.remove("delButton");
    hiddenDelBtn.classList.add("delButton-none");
}


const buttonsDisabled = () => {
  let editBtn = document.querySelectorAll(".editButton")
  let delBtn = document.querySelectorAll(".delButton");
  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].classList.remove("editButton");
    editBtn[i].classList.add("editButton-op");
    delBtn[i].classList.remove("delButton");
    delBtn[i].classList.add("delButton-op");
}
}

const buttonsVisible = (i) => {
  let saveBtn = document.querySelectorAll(".saveButton");
  saveBtn[i].classList.remove("saveButton");
  saveBtn[i].classList.add("saveButton-visible");
  let cancelBtn = document.querySelectorAll(".cancelButton");
  cancelBtn[i].classList.remove("cancelButton");
  cancelBtn[i].classList.add("cancelButton-visible");
}


const saveClick = () => {
  let saveButtons = document.querySelectorAll(".saveButton");
  for (let i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener ('click', function () {
      delSuccessMessage();
      let editRow = document.querySelector(".editTr");
      let input = editRow.querySelectorAll("input");
      let data = {};
      for (let k = 0; k < input.length; k++) {
          data[keys[k]] = input[k].value;}
      if (nameRegex.test(input[1].value) && emailRegex.test(input[2].value) && addressRegex.test(input[3].value)) {
      fetch(`http://localhost:3000/users/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(createList)
    .catch((error) => {console.error(error)})
    saveMessage()
    } else {
      defaultMessage();
    }
    })
  }
}

const cancelClick = () => {
  let cancelButtons = document.querySelectorAll(".cancelButton");
  for (let i = 0; i < cancelButtons.length; i++) {
    cancelButtons[i].addEventListener ('click', function() {
      buttonsReturnVisible();
      buttonsReturnHidden();
      readOnlyAll();
      let editRow = document.querySelector(".editTr");
      editRow.classList.remove("editTr");
      editRow.classList.add("row");
      let data = userList[i]
      fetch(`http://localhost:3000/users/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(createList)
    .catch((error) => {console.error(error)})
  })
}
}

const buttonsReturnVisible = () => {
  let reEditBtn = document.querySelector(".editButton-none")
    reEditBtn.classList.remove("editButton-none")
    reEditBtn.classList.add("editButton");
  let reDelBtn = document.querySelector(".delButton-none");
    reDelBtn.classList.remove("delButton-none")
    reDelBtn.classList.add("delButton");
  let opEditBtn = document.querySelectorAll(".editButton-op")
  let opDelBtn = document.querySelectorAll(".delButton-op");
  for (let i = 0; i < opEditBtn.length; i++) {
    opEditBtn[i].classList.remove("editButton-op")
    opEditBtn[i].classList.add("editButton");
    opDelBtn[i].classList.remove("delButton-op")
    opDelBtn[i].classList.add("delButton");
}
}

const buttonsReturnHidden = () => {
  let editRow = document.querySelector(".editTr");
  let reCancelBtn = editRow.querySelector('.cancelButton-visible')
    reCancelBtn.classList.remove("cancelButton-visible");
    reCancelBtn.classList.add("cancelButton");
  let reSaveBtn = editRow.querySelector('.saveButton-visible')
    reSaveBtn.classList.remove("saveButton-visible");
    reSaveBtn.classList.add("saveButton");
}

const readOnlyAll = () => {
  const table = document.querySelector('#userTable');
  let inputs = table.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
  inputs[i].setAttribute("readonly", true);
  inputs[i].removeAttribute('pattern')
  }
}

const submitClick = () => {
  let submitButton = document.querySelector("#submit");
  let form = document.querySelector(".form");
  submitButton.addEventListener ('click', function() {
    delSuccessMessage();
    let newInputs = form.querySelectorAll("input");
    let data = {};
    for (let k = 0; k < newInputs.length-1; k++) {
        data[keys[0]] = ""
        data[keys[k+1]] = newInputs[k].value;}
    if (nameRegex.test(newInputs[0].value) && emailRegex.test(newInputs[1].value) && addressRegex.test(newInputs[2].value)) {
    fetch(`http://localhost:3000/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(clearInputs(newInputs))
  .then(createList)
  .catch((error) => {console.error(error)})
  createMessage()
  } else {
    clearInputs(newInputs);
    defaultMessage();
  }

  })
}

const clearInputs = (newInputs) => {
  for (let k = 0; k < newInputs.length-1; k++) {
    newInputs[k].value = ""}
}

const delSuccessMessage = () => {
  let sucMessage = document.querySelector(".successfulMessage");
  sucMessage.textContent = "";
}

const delFaultMessage = () => {
  let faultMessage = document.querySelector(".faultMessage");
  faultMessage.textContent = "";
}

const saveMessage = () => {
  modalOut();
  delFaultMessage();
  let message = document.querySelector(".successfulMessage");
  message.textContent="Modification successful!";
  modalHidden();
}

const defaultMessage = () => {
  modalOut();
  delSuccessMessage();
  let message = document.querySelector(".faultMessage");
  message.textContent="Data is not valid!";
  modalHidden();
}

const createMessage = () => {
  modalOut();
  delFaultMessage();
  let message = document.querySelector(".successfulMessage");
  message.textContent="New user addition successful!";
  modalHidden();
}
    
export {getUsers}