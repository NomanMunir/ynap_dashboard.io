let parsedData, segregatedData;
// Parsing files Here with Papaparse
const parseData = (files) => {
    spinner.innerHTML = spinnerElem;
    // const file = files[0]
    Object.values(files).forEach(file => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: function (results) {
                parsedData = results.data
                segregateByName()
            }
        })
    });
}
// Handling input files Here 
function fileChangeHandler(e) {
    e.preventDefault();
    const fileElem = document.querySelector('#fileElem');
    if (!fileElem.files[0].name.endsWith('csv')) {
        alert("Please select csv file")
        return
    }
    parseData(fileElem.files)
}

document.querySelector('#fileElem').addEventListener('change', fileChangeHandler)

document.querySelector('#btn-filter-break').addEventListener('click', () => makeTable())
