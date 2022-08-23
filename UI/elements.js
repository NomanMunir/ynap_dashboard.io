const spinner = document.querySelector('.spinner');
const selcetYearMenuElem = document.querySelector("#select-year-menu");
const selcetMonthMenuElem = document.querySelector("#select-month-menu");
const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const spinnerElem = `
	<div class="spinner-border text-warning" role="status">
		  <span class="sr-only"></span>
	</div>`;

const createSelectYearMenu = (years) => {
	const html = [`<select class="form-select form-select-sm btn-warning" aria-label="Select Year">`];
	html.push(years.map(year => `<option value=${year}>${year}</option>`).join(""));
	html.push("</select>");
	selcetYearMenuElem.innerHTML = html.join("");
}

const createSelectMonthMenu = () => {
	const html = [`<select class="form-select form-select-sm btn-warning" aria-label="Select Month">`];
	html.push(monthsLong.map(month => `<option value=${month}>${month}</option>`).join(""));
	html.push("</select>");
	selcetMonthMenuElem.innerHTML = html.join("");
}
createSelectMonthMenu()		