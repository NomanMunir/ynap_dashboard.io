export const spinnerElem = document.querySelector('.spinner');
export const fromDateElem = document.querySelector("#from-date");
export const toDateElem = document.querySelector("#to-date");
export const fromTimeElem = document.querySelector("#from-time");
export const toTimeElem = document.querySelector("#to-time");
export const titleDate = document.querySelector(".titleDate");
export const breakTimeElem = document.querySelector("#break-time");
export const tableElem = document.querySelector("#table");

// -----------------------------------spinners------------------------------------ //

export const spinner = (value) => {
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

export const setDefaultDateTime = () => {
	const current = new Date();
	fromDateElem.value = current.toISOString().split("T")[0];
	fromTimeElem.value = current.toISOString().split("T")[1].split(".")[0];
	//setting date to previews date
	current.setDate(current.getDate() - 1);
	toDateElem.value = current.toISOString().split("T")[0];
	toTimeElem.value = current.toISOString().split("T")[1].split(".")[0];
}

// -----------------------------------Check Boxes Elements---------------------------------- //
export const perfChartCheckboxElem = document.querySelector('#perf-chart-checkbox');
export const uphChartCheckboxElem = document.querySelector('#uph-chart-checkbox');
export const tableCheckboxElem = document.querySelector('#table-checkbox');
export const fileCheckboxElem = document.querySelector('#file-checkbox');



