const spinnerElem = document.querySelector('.spinner');
const yearMenuElem = document.querySelector("#selected-year");
const monthMenuElem = document.querySelector("#selected-month");





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

// --------------------Setting previous month as a default month------------------------------ //
const current = new Date();
current.setMonth(current.getMonth() - 1);
monthMenuElem.value = current.toLocaleString('default', { month: 'long' });



// -----------------------------------Check Boxes Elements---------------------------------- //
const perfChartCheckbox = document.querySelector('#perf-chart-checkbox');
const uphChartCheckbox = document.querySelector('#uph-chart-checkbox');
const tableCheckbox = document.querySelector('#table-checkbox');
const fileCheckbox = document.querySelector('#file-checkbox');




