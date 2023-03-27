function checkLine(line){
    var started = false;
    var startChar = "";
    var previous = "";
    for (var letter of line){
        if (letter == "'" || letter == '"'){
            if (started == false && (previous == "f" || previous == "F")){
                return true;
            }else{
                if (started == false){
                    started = true;
                    startChar = letter;
                }else{
                    if (startChar == letter){
                        startChar = "";
                        started = false;
                    }
                }
            }
        }
        previous = letter;
    }
    return false;
}

function grabLines(line){
    var result = []
    var tempo = ""
    var started = false;
    var startChar = "";
    var previous = "";
    var grabbing = false;
    for (var letter of line){
        if (letter == "'" || letter == '"'){
            if (started == false && (previous == "f" || previous == "F")){
                started = true;
                startChar = letter;
                grabbing = true;
            }else{
                if (started == false){
                    started = true;
                    startChar = letter;
                }else{
                    if (startChar == letter){
                        startChar = "";
                        started = false;
                        if (grabbing){
                            grabbing = false;
                            result.push(tempo);
                            tempo = "";
                        }
                    }
                }
            }
        }else{
            if (grabbing){
                tempo += letter;
            }
        }
        previous = letter;
    }
    return result;
}

function grabVariables(line){
    var names = [];
    var layer = 0;
    var temp = "";
    for (var letter of line){
        if (letter == "{"){
            layer += 1;
        }
        if (letter == "}"){
            layer += -1;
            if (layer == 0){
                names.push(temp);
                temp = "";
            }
        }
        if (layer == 1 && letter != "{" && letter != "}"){
            temp += letter;
        }
    }
    return names;
}

function clean(items){
    var result = [];
    for (var item of items){
        result.push(item.slice(1));
    }
    return result;
}

function convertBlock(line){
    var names = [];
    var result = [];
    var layer = 0;
    var count = 0
    var temp = "";
    var tempNormal = "";
    for (var letter of line){
        if (letter == "{"){
            layer += 1;
        }
        if (letter == "}"){
            layer += -1;
            if (layer < 0){
                layer = 0;
            }
            if (layer == 0){
                names.push(temp);
                result.push("{}");
                temp = "";
            }
        }
        if (layer >= 1){
            temp += letter;
        }
        if (layer == 0 && letter != "}"){
            tempNormal += letter;
        }
        if (layer == 1 && tempNormal.length > 0){
            result.push(tempNormal);
            count++;
            tempNormal = "";
        }
    }
    //names contains all variables
    var final = "\"";
    if (count == 0){
        final += line;
    }
    for (var item of result){
        final += item;
    }
    final += "\".format(";
    names = clean(names);
    for (var i=0;i<names.length;i++){
        final += names[i];
        if (i != names.length-1){
            final += ", "
        }
    }
    final += ")"
    return final;
}

function convertLine(line){
    var result = ""
    var items = grabLines(line);
    var started = false;
    var tempo = "";
    var startChar = "";
    var previous = "";
    var grabbing = false;
    for (var letter of line){
        if (letter == "'" || letter == '"'){
            if (started == false && (previous == "f" || previous == "F")){
                started = true;
                startChar = letter;
                grabbing = true;
            }else{
                if (started == false){
                    started = true;
                    startChar = letter;
                }else{
                    if (startChar == letter){
                        startChar = "";
                        started = false;
                        if (grabbing){
                            grabbing = false;
                            tempo = "";
                        }
                    }
                }
            }
        }else{
            if (grabbing){
                tempo += letter;
            }
        }
        if (!started){
            result += letter;
        }
        previous = letter;
    }
    result = result.replaceAll("f'",";");
    result = result.replaceAll("f\"",";");
    result = result.replaceAll("F'",";");
    result = result.replaceAll("F\"",";");
    result = result.split(";");
    var final = "";
    for (var i=0;i<result.length-1;i++){
        final += result[i];
        final += convertBlock(items[i]);
    }
    return final;
}