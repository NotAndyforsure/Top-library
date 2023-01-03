let library = [];
const uploadBtn = document.querySelector("#upload");
const uploadForm = document.querySelector("#uploadform");
const submitBtn = document.querySelector("#submitbtn");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const isRead = document.querySelector("#status");
let id = library.length;
const titleWarning = document.querySelector("#titlewarning");
const authorWarning = document.querySelector("#authorwarning");
const bookArea = document.querySelector("#bookarea");
let readStatus = isRead.options[isRead.selectedIndex].value;
const editBtn = document.querySelector("#edit");
let crdBtnShow = 0;
let delBtnAct = 0;
let editBtnAct = 0;
const headerLabel = document.querySelector("#headerlabel");
const titleLabel = document.querySelector("#titlelabel");
const authorLabel = document.querySelector("#authorlabel");
let updateNum = 0;

// Book constructor function
function Book(btitle, bauthor, bstatus) {
  this.title = btitle;
  this.author = bauthor;
  this.status = bstatus;
}
//  show form function
function uploadShow(a) {
  a.classList.toggle("show");
}
//  Authorize title input

function authorauthorize(b) {
  const authpattern = /([A-Z][.a-z][a-z]+|A-Z][.a-z][a-z][\s]+)/;
  if (
    authpattern.test(b.value) === true &&
    b.value.length > 3 &&
    b.value.length < 21 &&
    b.value[0] !== " " &&
    b.value[1] !== " " &&
    b.value[2] !== " " &&
    b.value[b.value.length - 1] !== " "
  ) {
    return true;
  }
  return false;
}
// Authorize author input
function titleauthorize(a) {
  const tipattern = /([\w][\w][\w]+|[\w][\w][\w][\s]+)/;
  if (
    tipattern.test(a.value) === true &&
    a.value.length > 3 &&
    a.value.length < 31 &&
    a.value[0] !== " " &&
    a.value[1] !== " " &&
    a.value[2] !== " " &&
    a.value[a.value.length - 1] !== " "
  ) {
    return true;
  }
  return false;
}

// show input warning text

function showwarn(which) {
  switch (which) {
    case "author":
      titleWarning.classList.remove("show");
      authorWarning.classList.add("show");
      author.value = "";
      break;
    case "title":
      titleWarning.classList.add("show");
      authorWarning.classList.remove("show");
      title.value = "";

      break;
    case "both":
      titleWarning.classList.add("show");
      authorWarning.classList.add("show");
      title.value = "";
      author.value = "";
      break;
    default:
      titleWarning.classList.remove("show");
      authorWarning.classList.remove("show");
      title.value = "";
      author.value = "";
  }
}

// book assembler

function assemblebook() {
  readStatus = isRead.options[isRead.selectedIndex].value;
  library[id] = new Book(title.value, author.value, readStatus);
  id = library.length;
}

// create book display

function create() {
  for (let i = 0; i < library.length; i += 1) {
    const obTitle = library[i].title;
    const obAuthor = library[i].author;
    const obStatus = library[i].status;

    const newCard = document.createElement("div");
    const newTitle = document.createElement("span");
    const newAuthor = document.createElement("span");
    const newStatus = document.createElement("span");
    const crdBtndiv = document.createElement("div");
    const crdDelBtn = document.createElement("button");
    const crdEditBtn = document.createElement("button");

    newCard.setAttribute("class", "item-example");
    newCard.setAttribute("data-id", `${i}`);
    newCard.setAttribute("id", `num${i}`);
    newTitle.setAttribute("class", "title");
    newAuthor.setAttribute("class", "author");
    newStatus.setAttribute("class", "status");
    crdBtndiv.setAttribute("id", "crdbtndiv");
    crdBtndiv.setAttribute("class", "crdbtndiv");
    crdDelBtn.setAttribute("id", "delbtn");
    crdDelBtn.setAttribute("class", "delbtn");
    crdEditBtn.setAttribute("id", "editbtn");
    crdEditBtn.setAttribute("class", "editbtn");
    crdEditBtn.setAttribute("data-id", `${i}`);
    crdDelBtn.setAttribute("data-id", `${i}`);

    newTitle.textContent = `${obTitle}`;
    newAuthor.textContent = `${obAuthor}`;
    newStatus.textContent = `${obStatus}`;
    crdEditBtn.textContent = "Update";
    crdDelBtn.textContent = "Delete";

    newCard.append(newTitle);
    newCard.append(newAuthor);
    newCard.append(newStatus);
    newCard.append(crdBtndiv);
    crdBtndiv.append(crdEditBtn);
    crdBtndiv.append(crdDelBtn);

    bookArea.appendChild(newCard);
    crdBtnShow = document.querySelectorAll("#crdbtndiv");
    delBtnAct = document.querySelectorAll("#delbtn");
    editBtnAct = document.querySelectorAll("#editbtn");
  }
}
// refresh display
function refresh() {
  for (let i = 0; i < library.length; i += 1) {
    const item = document.querySelector(`#num${i}`);
    item.remove();
  }
}

// disassemble book

function disassemblebook() {
  const num = parseInt(this.dataset.id, 10);
  refresh();
  library[num] = "";
  library = library.filter((item) => item !== "");
  create();
  id = library.length;
}

// upload new book
function uploadnew() {
  if (titleauthorize(title) === true && authorauthorize(author) === true) {
    if (library.length > 0) {
      refresh();
      assemblebook();
      create();
    } else {
      assemblebook();
      create();
    }

    showwarn("none");
    uploadShow(uploadForm);
  } else if (
    titleauthorize(title) === true &&
    authorauthorize(author) === false
  ) {
    showwarn("author");
  } else if (
    titleauthorize(title) === false &&
    authorauthorize(author) === true
  ) {
    showwarn("title");
  } else {
    showwarn("both");
  }
}

//  Upload new details
function uploadUpdate(e) {
  if (titleauthorize(title) === true && authorauthorize(author) === true) {
    readStatus = isRead.options[isRead.selectedIndex].value;
    library[e] = new Book(title.value, author.value, readStatus);
    refresh();
    create();
    headerLabel.textContent = "Submit a New Book";
    titleLabel.textContent = "1.What is the Book's title?";
    authorLabel.textContent = "2.What is the author's name?";
    showwarn("none");
  } else if (
    titleauthorize(title) === true &&
    authorauthorize(author) === false
  ) {
    showwarn("author");
  } else if (
    titleauthorize(title) === false &&
    authorauthorize(author) === true
  ) {
    showwarn("title");
  } else {
    showwarn("both");
  }
}
// update Book function
function updateBook() {
  uploadUpdate(updateNum);
  showwarn("none");
  uploadShow(uploadForm);
}

function crazy(n) {
  if (n === 1) {
    submitBtn.removeEventListener("click", updateBook);
    submitBtn.addEventListener("click", uploadnew);
    showwarn("none");
  } else {
    submitBtn.removeEventListener("click", uploadnew);
    submitBtn.addEventListener("click", updateBook);
  }
}

// show form on click
uploadBtn.addEventListener("click", () => {
  uploadShow(uploadForm);
  crazy(1);
  showwarn("none");
});

editBtn.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
  crdBtnShow.forEach((element) => {
    element.classList.toggle("show");
  });
  editBtnAct.forEach((ele) => {
    ele.addEventListener("click", () => {
      uploadShow(uploadForm);
      updateNum = parseInt(ele.dataset.id, 10);
      headerLabel.textContent = "Update Your Book Details";
      titleLabel.textContent = "What Is Your Book's New Title?";
      authorLabel.textContent = "What Is Your Books New Author?";
      crazy(2);
    });
  });

  delBtnAct.forEach((ele) => {
    ele.addEventListener("click", disassemblebook);
  });
});
