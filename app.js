import { setDefaultDateTime, spinner } from "./UI/elements.js";
import { calculatePackersData } from "./scripts/helpers.js";
import { makeTable } from "./UI/table.js";
import { charts } from "./scripts/charts.js";


setDefaultDateTime();

const parseData = () => {
    spinner("add")
    Papa.parse(`/test.csv`, {
        download: true,
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        error: function (error, data) {
            alert('File not found!');
            console.log(error, data);
            spinner("remove");
        },
        complete: function (results) {
            window.packers = results.data;
            const packersData = calculatePackersData(results.data);
            makeTable(packersData);
            charts(packersData);
            spinner("remove");
        }
    })
}


document.addEventListener("DOMContentLoaded", () => {
    parseData();
});