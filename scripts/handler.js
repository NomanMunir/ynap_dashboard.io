import { breakTimeElem, perfChartCheckboxElem, tableCheckboxElem, tableElem, uphChartCheckboxElem } from "../UI/elements.js";

export const tableCheckboxChangeHandler = (e) => {
    if (!tableCheckboxElem.checked) {
        tableElem.className = "display-none";
    } else {
        tableElem.className = "mx-auto my-3 bg-white";
    }
}

export const perfChartCheckboxChangeHandler = (e) => {
    if (!perfChartCheckboxElem.checked) {
        perfChartCheckboxElem.className = "display-none";
    } else {
        perfChartCheckboxElem.className = "mx-auto my-3 bg-white";
    }
}

export const uphChartCheckboxChangeHandler = (e) => {
    if (!uphChartCheckboxElem.checked) {
        uphChartCheckboxElem.className = "display-none";
    } else {
        uphChartCheckboxElem.className = "mx-auto bg-white";
    }
}

export const breakTimeFilterChangeHandler = (e) => {
    if (e.key == "Enter") {
        getPackersData()
        breakTimeElem.value = "";
    }
}

breakTimeElem.addEventListener('keypress', breakTimeFilterChangeHandler)
perfChartCheckboxElem.addEventListener('change', perfChartCheckboxChangeHandler);
tableCheckboxElem.addEventListener('change', tableCheckboxChangeHandler);
uphChartCheckboxElem.addEventListener('change', uphChartCheckboxChangeHandler);
