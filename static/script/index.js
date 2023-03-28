var FinalData = "";
var FinalFileName = "";
function addText(text){
    var element = $("#window");
    // element.text(element.text() + "\n"); 
    element.text(element.text() + "\n" + text); 
    element.scrollTop(element.prop('scrollHeight'));
}

function clearText(){
    var element = $("#window");
    element.text("");
}

function downloadFile(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function startOperation(List,fileName){
    var lines = 0;
    var lineText = " line";
    
    addText("\n***File uploaded");
    addText("\n---------");
    for (var line of List){
        addText(line);
    }
    addText("\n---------");

    addText("\n***Started processing file...")
    var result = "";
    for (var line of List){
        if (checkLine(line)){
            lines++;
            result += convertLine(line) + "\r\n";
        }else{
            result += line + "\r\n";
        }
    }
    // console.log(result);
    // console.log(fileName);
    // downloadFile("(new)"+fileName,result);
    FinalData = result;
    FinalFileName = "(new)"+fileName;
    if (lines > 1){
        lineText = " lines"
    }
    addText("\n***File is ready to be downloaded, " + lines + lineText + " converted")
}

function download(){
    if (FinalData != ""){
        downloadFile(FinalFileName,FinalData);
        addText("\n***File download started")
    }else{
        addText("\n***Please load a file first");
    }
}

