console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.querySelector("#addTxt");

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    //   console.log(notesObj);

    let addTitle = document.querySelector("#addTitle");
    let title = localStorage.getItem("title");
    if (title == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(title);
    }
    titleObj.push(addTitle.value);
    localStorage.setItem("title", JSON.stringify(titleObj));
    addTitle.value = "";

    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if (title == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(title);
    }

    let html = "";
    notesObj.forEach(function (element, index) {

        html += `<div class="noteCard card mx-2 my-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${titleObj[index]}</h5>
                            <p class="card-text">${element}</p>
                            <button class="btn btn-primary" id ="${index}" onclick="deleteNote(this.id)">Delete Note</button>
                        </div>
                    </div>`;
    });
    if (notesObj.length != 0) {

        document.getElementById('notes').innerHTML = html;

    }
    else {
        document.getElementById('notes').innerHTML = `No notes to show. Use the above section to ADD notes`;
    }
}
function deleteNote(index) {
    //   console.log("I am deleting", index);
    // console.log(typeof (index));
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    if (title == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(title);
    }
    titleObj.splice(index, 1)
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function (element) {

    let inputVal = search.value;

    let card = document.getElementsByClassName("noteCard");
    Array.from(card).forEach(function (element) {
        let text = element.getElementsByTagName('p')[0].innerText;
        if (text.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});