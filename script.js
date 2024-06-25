let colorSelected; 

//made grid global, since we should 
//only be accessing the one grid
//we want to draw on
let grid = document.getElementById("curr-grid")

let saves = 0;

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

            console.log(grid.getElementsByTagName("td")[0].clientWidth);
            resizeCell(col);

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

            resizeCell(col)

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
    //get the copied canvas
    //console.log(document.getElementById("curr-canvas"));
    let save = document.getElementById("curr-canvas").cloneNode(true);
    
    //set the id of the grid
    save.id = "cloneCanvas-" + saves.toString();
    save.lastElementChild.id = "cloneGrid-" +saves.toString();
    console.log(save);
    console.log(save.lastElementChild);
    

    //make the title element
    let input = document.getElementById("piece-name");
    let name = input.value;
    let titlePanel = document.createElement("div");

    let title = document.createElement("p");
    title.innerHTML = name;

    titlePanel.append(title);
    titlePanel.classList.add("title")
    console.log(save.lastElementChild);

    //make the zoom element
    let zoomInButton = document.createElement("button");
    zoomInButton.textContent = "(+)";
    let zoomOutButton = document.createElement("button");
    zoomOutButton.textContent = "(-)";

    zoomInButton.onclick = function(){zoomIn(save.lastElementChild)};
    zoomOutButton.onclick = function(){zoomOut(save.lastElementChild)};

    //zoom panel creation
    let zoomPanel = document.createElement("div");
    zoomPanel.classList.add("zoom");

    zoomPanel.append(zoomInButton);
    zoomPanel.append(zoomOutButton);

    //console.log(name);
    //let grid = document.getElementById("grid");
    //make post panel
    let postPanel = document.createElement("div");
    postPanel.classList.add("canvas-panel");
    postPanel.appendChild(titlePanel);
    postPanel.appendChild(zoomPanel);

    
    
    //make post
    let post = document.createElement("div");
    post.classList.add("canvas-container");
    
    post.appendChild(postPanel);
    post.appendChild(save);

    let savedGrids = document.getElementById("saved-grids");
    savedGrids.appendChild(post);
    //console.log("whaaaa")
    saves++;
}

//helper function to apply a new dimension to a cell
//only call if not empty grid
function resizeCell(pCell, pDimensionString = grid.getElementsByTagName("td")[0].clientWidth .toString() + 'px')
{
    pCell.style.width = pDimensionString;
    pCell.style.height = pDimensionString;
    pCell.style.minHeight = pDimensionString;
    pCell.style.minWidth = pDimensionString;
}

function zoomIn(pGrid = grid)
{
    console.log(pGrid);
    const cells = pGrid.getElementsByTagName("td");

    if (cells.length <= 0) return;
    //console.log(cells);
    const currDimension = cells[0].clientWidth;
    let newDimension;

    if (currDimension >= 200) 
    {
        alert("You cannot zoom in anymore");
        return;
    }
    else if (currDimension > 50) newDimension = currDimension + 10;
    else if (currDimension > 20) newDimension = currDimension + 5;
    else newDimension = currDimension + 1;
    
    console.log(newDimension);

    const newDimensionString = newDimension.toString() + 'px';
    for(let i = 0; i < cells.length; i++)
    {
        resizeCell(cells[i], newDimensionString)
    }
}

function zoomOut(pGrid = grid)
{
    const cells = pGrid.getElementsByTagName("td");

    if (cells.length <= 0) return;
    //console.log(cells);
    const currDimension = cells[0].clientWidth;
    let newDimension;

    if (currDimension <= 1)
    {
        alert("You cannot zoom in anymore");
        return;
    }
    else if (currDimension < 20) newDimension = currDimension - 1;
    else if (currDimension < 50) newDimension = currDimension - 5;
    else newDimension = currDimension - 10;
    
    console.log(newDimension);

    const newDimensionString = newDimension.toString() + 'px';
    for(let i = 0; i < cells.length; i++)
    {
        resizeCell(cells[i], newDimensionString)
    }
}