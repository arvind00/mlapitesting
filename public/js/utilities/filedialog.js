// forId is the id of input of type file
function openFileDialog(forId){
    document.getElementById(forId).click();
}
//called from input type file
function updateFilePathField(fileObj, targetInputId){
    document.getElementById(targetInputId).value = (fileObj.files.length >= 1)  ? fileObj.files[0].name: "";    
}