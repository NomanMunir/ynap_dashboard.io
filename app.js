const parseData = (file) => {
    spinner.innerHTML = spinnerElem;
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: function (results) {
            CONFIG.parsedData = results.data;
            segregateByName()
            spinner.innerHTML = ""
        }
    });
}
// Handling input files Here 
function fileChangeHandler(e) {
    e.preventDefault();
    const fileElem = document.querySelector('#fileElem');
    console.log(fileElem.files)
    const file = fileElem.files[0]
    if (!file.name.endsWith('csv')) {
        alert("Please select csv file")
        return
    }
    parseData(file)
}

document.querySelector('#fileElem').addEventListener('change', fileChangeHandler)
document.querySelector('#btn-filter-break').addEventListener('click', () => makeTable())

