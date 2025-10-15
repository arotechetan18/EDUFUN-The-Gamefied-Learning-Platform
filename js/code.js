


const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

addBtn.addEventListener("click", function () {
    addNote();
});


const saveNotes = () => {

    
    const notes = 
        document.querySelectorAll(".note .content"); 
        
    
    const titles = 
        document.querySelectorAll(".note .title"); 

    const data = [];

    notes.forEach((note, index) => {
        const content = note.value;
        const title = titles[index].value;
        console.log(title);
        if (content.trim() !== "") {
            data.push({ title, content });
        }
    });

    const titlesData = 
        data.map((item) => item.title);
    console.log(titlesData);
    localStorage.setItem(
        "titles", JSON.stringify(titlesData));

    const contentData = 
        data.map((item) => item.content);
    localStorage.setItem(
        "notes", JSON.stringify(contentData));
};


const addNote = (text = "", title = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="icons">
         <i class="save fas fa-save" 
             style="color:red">
         </i>
         <i class="trash fas fa-trash" 
             style="color:yellow">
         </i> 
    </div>
    <div class="title-div">
        <textarea class="title" 
            placeholder="Write the title ...">${title}
        </textarea>
    </div>
    <textarea class="content" 
        placeholder="Note down your thoughts ...">${text}
    </textarea>
    `;
    function handleTrashClick() {
        note.remove();
        saveNotes();
    }
    function handleSaveClick() {
        saveNotes();
    }
    const delBtn = note.querySelector(".trash");
    const saveButton = note.querySelector(".save");
    const textareas = note.querySelectorAll("textarea");

    delBtn.addEventListener("click", handleTrashClick);
    saveButton.addEventListener("click", handleSaveClick);
    main.appendChild(note);
    saveNotes();
};

function loadNotes() {

    const titlesData = 
        JSON.parse(localStorage.getItem("titles")) || [];
    const contentData = 
        JSON.parse(localStorage.getItem("notes")) || [];
        
    for (let i = 0; 
            i < Math.max(
                titlesData.length, contentData.length); i++) {
        addNote(contentData[i], titlesData[i]);
    }
}
loadNotes
