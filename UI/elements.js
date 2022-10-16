const spinnerElem = document.querySelector('.spinner');
const selcetYearMenuElem = document.querySelector("#select-year-menu");
const selcetMonthMenuElem = document.querySelector("#selected-month");





// -----------------------------------spinners------------------------------------ //

const spinner = (value) => {
	if (value == "add") {

		spinnerElem.innerHTML = `
		<div class="spinner-border text-warning" role="status">
		<span class="sr-only"></span>
		</div>`
	} else if (value == "remove") {
		spinnerElem.innerHTML = '';
	} else {
		return
	}
};



// -----------------------------------Check Boxes Elements---------------------------------- //
const perfChartCheckbox = document.querySelector('#perf-chart-checkbox');
const uphChartCheckbox = document.querySelector('#uph-chart-checkbox');
const tableCheckbox = document.querySelector('#table-checkbox');
const fileCheckbox = document.querySelector('#file-checkbox');




