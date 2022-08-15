let parsedData, packersData;

// Html Elements
const perfChartCheckbox = document.querySelector('#perf-chart-checkbox');
const uphChartCheckbox = document.querySelector('#uph-chart-checkbox');
const tableCheckbox = document.querySelector('#table-checkbox');
const fileCheckbox = document.querySelector('#file-checkbox');




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
                getPackersData();
            }
        })
    });
}



const getPackersData = () => {
    const cleanAndSortedData = parsedData.sort((a, b) => {
        return new Date(a['Packing End']) - new Date(b["Packing End"])
    });
    const packersDataGroupByNames = cleanAndSortedData
        .filter(order => order['Packer Name'] !== "undefined" && order['Packer Name'] !== 'null' && order['Packer Name'] !== '' && order["Packer Name"] !== undefined && order["Order ID"])
        .reduce((acc, order) => {
            const packerName = order['Packer Name'].toUpperCase().trim();
            const orders = order['Order Number']
            acc[packerName] = acc[packerName] || {};
            acc[packerName]["items"] = acc[packerName]["items"] || []
            acc[packerName]['orders'] = acc[packerName]['orders'] || {}
            acc[packerName]['orders'][orders] = acc[packerName]['orders'][orders] || []
            acc[packerName]["items"].push(order)
            acc[packerName]['orders'][orders].push(order)
            return acc
        }, {})

    const results = (Object.entries(packersDataGroupByNames).slice().filter(([packerName, packerData]) => Object.keys(packerData['orders']).length > 2)
        .reduce((result, [packerName, packerData]) => {
            const packerId = packerData['items'][0]['Packed by'];
            const numberOfItems = packerData['items'];
            const numberOfOrders = packerData['orders'];
            const upo = numberOfItems.length / Object.keys(numberOfOrders).length;
            const totalTimeInHr = getTotalTime(packerData);
            const uph = numberOfItems.length / totalTimeInHr;
            result.push(
                {
                    packerName,
                    packerId,
                    numberOfItems,
                    numberOfOrders,
                    totalTimeInHr,
                    upo,
                    uph
                }
            )
            return result
        }, []));
    packersData = results;

    perfChartCheckbox.checked = true;
    uphChartCheckbox.checked = true;
    tableCheckbox.checked = true;
    fileCheckbox.checked = false;

    if (!fileCheckbox.checked) {
        dropArea.className = "display-none";
        fileCheckbox.checked = false;
    } else {
        dropArea.className = "d-flex flex-column justify-content-center";
    }
    if (!tableCheckbox.checked) {
        document.querySelector('#table').className = "display-none";
    } else {
        makeTable(results)
    }
    charts(results);
    spinner.innerHTML = ""

}


const tableCheckboxChangeHandler = (e) => {
    if (!tableCheckbox.checked) {
        document.querySelector('#table').className = "display-none";
    } else {
        document.querySelector('#table').className = "mx-auto my-3 bg-white";
    }
}

const perfChartCheckboxChangeHandler = (e) => {
    if (!perfChartCheckbox.checked) {
        document.querySelector('#perf-charts').className = "display-none";
    } else {
        document.querySelector('#perf-charts').className = "mx-auto my-3 bg-white";
    }
}

const uphChartCheckboxChangeHandler = (e) => {
    if (!uphChartCheckbox.checked) {
        document.querySelector('#uph-charts').className = "display-none";
    } else {
        document.querySelector('#uph-charts').className = "mx-auto bg-white";
    }
}

const fileChartCheckboxChangeHandler = (e) => {
    if (!fileCheckbox.checked) {
        dropArea.className = "display-none";
    } else {
        dropArea.className = "d-flex flex-column justify-content-center";
    }
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
document.querySelector('#btn-filter-break').addEventListener('click', () => getPackersData())

perfChartCheckbox.addEventListener('change', perfChartCheckboxChangeHandler);
tableCheckbox.addEventListener('change', tableCheckboxChangeHandler);
uphChartCheckbox.addEventListener('change', uphChartCheckboxChangeHandler);
fileCheckbox.addEventListener('change', fileChartCheckboxChangeHandler)

