function addText(text){
    var element = $("#window");
    // element.text(element.text() + "\n"); 
    element.text(element.text() + "\n" + text); 
}

function clearText(){
    var element = $("#window");
    element.text("");
}

function startOperation(List){
    //Work on this function
    for (var line of List){
        addText(line);
    }
    addText("\nFile uploaded");

    addText("\nStarted processing file...")
}