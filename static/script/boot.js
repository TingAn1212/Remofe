const fileUpload = document.querySelector('#file-input');
const fileDownload = document.querySelector('#file-output');

fileDownload.addEventListener("click", () => {
    download();
});

fileUpload.addEventListener('drop', (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
});

fileUpload.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.py'; // Specify the file type(s) you want to allow
    fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    handleFile(file);
    fileInput.remove();
    });
    fileInput.click();
});

function handleFile(file) {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (event) => {
        const fileContents = event.target.result;
        // fileContents is a string with line break as \r\n
        // Do something with the file contents...
        const splitFileContents = fileContents.split("\r\n");
        startOperation(splitFileContents,file.name);
    };
}