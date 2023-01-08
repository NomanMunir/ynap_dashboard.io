<!DOCTYPE html>
<html>

<head>
	<link rel="stylesheet" href="styles/style.css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
		crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.js"
		integrity="sha512-VcwFAndRWOHd2GciF0dxUnsMlQGvIWMzKaOECoZT/xvKE3B6Lsow+xtuoi+fI/hBKF2F05mgLcynmICdvI4a4g=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/chart.min.js"
		integrity="sha512-sW/w8s4RWTdFFSduOTGtk4isV1+190E/GghVffMA9XczdJ2MDzSzLEubKAs5h0wzgSJOQTRYyaz73L3d6RtJSg=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.0.0/chartjs-plugin-datalabels.min.js"
		integrity="sha512-R/QOHLpV1Ggq22vfDAWYOaMd5RopHrJNMxi8/lJu8Oihwi4Ho4BRFeiMiCefn9rasajKjnx9/fTQ/xkWnkDACg=="
		crossorigin="anonymous" referrerpolicy="no-referrer"></script>


	<title>Ynap Dashboard</title>

</head>

<body>
	<div class="container-fluid">
		<header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
			<a href="" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
				<!-- <svg class="bi me-2" width="40" height="32">
					<use xlink:href="#bootstrap"></use>
				</svg> -->
				<span class="fs-4 text-warning"><b>YNAP</b></span>
			</a>

			<div>
				<input class="form-control form-control" defaultValue="60" placeholder="Filter Break Time" type="text"
					name="Fileter" id="break-time">
			</div>
			<div class="btn-group btn-group-sm" role="group" aria-label="Basic checkbox toggle button group">
				<input hidden type="checkbox" class="btn-check" id="file-checkbox" autocomplete="off">
				<label hidden class="btn btn-outline-warning" for="file-checkbox">File</label>

				<input type="checkbox" checked class="btn-check" id="perf-chart-checkbox" autocomplete="off">
				<label class="btn btn-outline-warning" for="perf-chart-checkbox">Perf Chart</label>

				<input type="checkbox" checked class="btn-check" id="table-checkbox" autocomplete="off">
				<label class="btn btn-outline-warning" for="table-checkbox">Table</label>

				<input type="checkbox" checked class="btn-check" id="uph-chart-checkbox" autocomplete="off">
				<label class="btn btn-outline-warning" for="uph-chart-checkbox">Uph Chart</label>

			</div>
			<div class="mx-2" id="select-month-menu">
				<select id="selected-month" class="form-select form-select-sm btn-warning" aria-label="Select Month">
					<option value="January">January</option>
					<option value="February">February</option>
					<option value="March">March</option>
					<option value="April">April</option>
					<option value="May">May</option>
					<option value="June">June</option>
					<option value="July">July</option>
					<option value="August">August</option>
					<option value="September">September</option>
					<option value="October">October</option>
					<option value="November">November</option>
					<option value="December">December</option>
				</select>
			</div>
			<div class="mx-2" id="select-year-menu">
				<select id="selected-year" class="form-select form-select-sm btn-warning" aria-label="Select Year">
					<option value="2022">2022</option>
				</select>
			</div>
			<!-- <div>
				<label for="formFileSm" class="form-label">Small</label>
				<input class="form-control form-control-sm" id="formFileSm" type="file">
			</div> -->
			<!-- <input class="form-control" accept=".csv" type="file" multiple id="fileElem"> -->
		</header>
	</div>

	<center>
		<div class="spinner"></div>
	</center>
	<section class="d-flex flex-column justify-content-center gx-3">
		<div class="mx-auto my-3 bg-white" style="width: 90vw; height:auto;" id="perf-charts"></div>
		<div id="table" class="mx-auto my-3 bg-white" style="width: 90vw; height:auto;"></div>
		<div class="mx-auto bg-white" id="uph-charts" style="width: 90vw; height:100vh;"></div>
	</section>

</body>
<!-- <script src="scripts/drag-drop.js"></script> -->
<script src="scripts/helpers.js"></script>
<script src="scripts/config.js"></script>
<script src="UI/elements.js"></script>
<script src="UI/table.js"></script>
<script src="scripts/charts.js"></script>
<script src="app.js"></script>
<script>
	// const parseData = () => {
	// 	spinner("add")
	// 	// const file = files[0]
	// 	const selectedMonth = monthMenuElem.value;
	// 	const selectedYear = yearMenuElem.value;
	// 	Papa.parse(`/personal/nauman_munir_dhl_com/Documents/Ynap%20Dashboard/csv/${selectedMonth}_${selectedYear}_Logins file.csv`, {
	// 		download: true,
	// 		header: true,
	// 		skipEmptyLines: true,
	// 		dynamicTyping: true,
	// 		error: function (error, file) {
	// 			alert(`Month or Year Not Found!`)
	// 			spinner("remove");
	// 		},
	// 		complete: function (results) {
	// 			parsedData = results.data
	// 			getPackersData();
	// 			// createSelectYearMenu(years)
	// 		}
	// 	})
	// }
</script>