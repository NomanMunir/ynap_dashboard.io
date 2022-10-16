let parsedData, packersData;



// Html Elements



// const parseData = () => {
//     addSpinner()
//     // const file = files[0]
//     const selectedMonth = selcetMonthMenuElem.value
//     Papa.parse(`/csv/${selectedMonth}_2022_Logins file.csv`, {
//         download: true,
//         header: true,
//         skipEmptyLines: true,
//         dynamicTyping: true,
//         error: function (error, file) {
//             alert(`Month Not Found :-(`)
//             resetSpinner()
//             selcetMonthMenuElem.value = "January"
//         },
//         complete: function (results) {
//             parsedData = results.data
//             getPackersData();
//             // createSelectYearMenu(years)
//         }
//     })
// }

const getPackersData = () => {
    const packersDataGroupByNames = parsedData.sort((a, b) => {
        return new Date(a['Packing End']) - new Date(b["Packing End"])
    })
        .filter(order => order['Packer Name'] !== "undefined" && order['Packer Name'] !== 'null' &&
            order['Packer Name'] !== '' && order["Packer Name"] !== undefined && order["Order ID"])
        .reduce((acc, order) => {
            const packerName = order['Packer Name'].toUpperCase().trim();
            const orders = order['Order Number'];
            acc[packerName] = acc[packerName] || {};
            acc[packerName]["items"] = acc[packerName]["items"] || [];
            acc[packerName]['orders'] = acc[packerName]['orders'] || {};
            acc[packerName]['orders'][orders] = acc[packerName]['orders'][orders] || []
            if (acc[packerName]['orders'][orders].length <= 60) {
                acc[packerName]['orders'][orders].push(order);
                acc[packerName]["items"].push(order);
            }
            return acc
        }, {})
    const results = (Object.entries(packersDataGroupByNames).slice()
        .filter(([packerName, packerData]) => Object.values(packerData['orders']).filter((val) => val.length <= 50).length > 2)
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

    makeTable(results)
    charts(results);
    spinner("remove")
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

const timeFilterChangeHandler = (e) => {
    if (e.key == "Enter") {
        getPackersData()
        document.querySelector('#break-time').value = "";
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



const onMonthChangehandler = (e) => {
    parseData()
}

selcetMonthMenuElem.addEventListener('change', onMonthChangehandler)

// document.querySelector('#fileElem').addEventListener('change', fileChangeHandler)
document.querySelector('#break-time').addEventListener('keypress', timeFilterChangeHandler)

perfChartCheckbox.addEventListener('change', perfChartCheckboxChangeHandler);
tableCheckbox.addEventListener('change', tableCheckboxChangeHandler);
uphChartCheckbox.addEventListener('change', uphChartCheckboxChangeHandler);
fileCheckbox.addEventListener('change', fileChartCheckboxChangeHandler);


document.addEventListener("DOMContentLoaded", () => {
    parseData();
});