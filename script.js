let colorSelected; 

//made grid global, since we should 
//only be accessing the one grid
//we want to draw on
let grid = document.getElementById("grid")

//Adds a row
function addR() {
    //let grid = document.getElementById("grid");
    let rows = grid.getElementsByTagName("tr");

    //if grid is empty need to create row
    if (rows.length === 0) {
        let row = document.createElement("tr");
        let col = document.createElement("td");
        col.onclick = function(){
            this.style.backgroundColor = colorSelected;
        };

        row.appendChild(col);
        grid.appendChild(row);
    //otherwise append a new row with the current
    //amount of columns
    } else {
        let numCols = rows[0].childElementCount;
        let row = document.createElement("tr");
        for (let i = 0; i < numCols; i++){
            let col = document.createElement("td");
            col.onclick = function(){
              this.style.backgroundColor = colorSelected;
            };
            row.appendChild(col);
        }
        grid.appendChild(row);
    }
}
//Adds a column
function addC() {
    //let grid = document.getElementById("grid");
    let rows = grid.getElementsByTagName("tr");
    
    if (rows.length === 0) {
        let row = document.createElement("tr");
        let col = document.createElement("td");
        col.onclick = function (){
            this.style.backgroundColor = colorSelected;
        };
        row.appendChild(col);
        grid.appendChild(row);

    } else {
        for (let i = 0; i < rows.length; i++){
            let col = document.createElement("td");
            col.onclick = function(){
              this.style.backgroundColor = colorSelected;
            };
            rows[i].appendChild(col);
        }
    } 
}

//Removes a row
function removeR() {
    //let grid = document.getElementById("grid");
    let rows = grid.getElementsByTagName("tr");
    if(rows.length === 0){
        alert("There is nothing to delete");
        return;
    }

    let lastRow = grid.lastElementChild;
    grid.removeChild(lastRow);
    
}
//Remove a column
function removeC() {
    let rows = grid.getElementsByTagName("tr");
    //let grid = document.getElementById("grid");

    if(rows.length === 0){
        alert("There is nothing to delete");
        return;
    }

    if(rows[0].childElementCount === 1) {
        grid.innerHTML = "";
        return;
    } 

    for (let i = 0; i < rows.length; i++){
        let col = rows[i].lastElementChild; 
        rows[i].removeChild(col);
    }

}
//sets global variable for selected color
function selected(){
    colorSelected = document.getElementById("selectedID").value;
}

function fill(){
    let cells = grid.getElementsByTagName("td");

    //console.log(cells);

    for (let i = 0; i < cells.length; i++){
        cells[i].style.backgroundColor = colorSelected;
    }
}

function clearAll(){
    let cells = grid.getElementsByTagName("td");

    for (let i = 0; i < cells.length; i++){
        cells[i].style.backgroundColor = "";
    }
}

function fillU(){
    let cells = grid.getElementsByTagName("td");

    for (let i = 0; i < cells.length; i++){
        if (cells[i].style.backgroundColor === "") {
            cells[i].style.backgroundColor = colorSelected;
        }
    }
}

function saveGrid(){
    let input = document.getElementById("grid-name");
    let name = input.value;
    console.log(name);
    //let grid = document.getElementById("grid");
    let save = grid.cloneNode(true);

    let post = document.createElement("div");
    let title = document.createElement("p");
    title.innerHTML = name;
    post.appendChild(title);
    post.appendChild(save);

    let savedGrids = document.getElementById("saved-grids");
    savedGrids.appendChild(post);
    //console.log("whaaaa")
}
