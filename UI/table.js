
const makeTable = () => {
  const data = CONFIG.segregatedData
  const tableElement = document.querySelector('#table');
  const tableHtml =
    [`
    <div class="table-responsive p-2 text-center shadow-sm">
		<table class="table-sm align-middle table table-hover">
			<thead>
				<tr class="table-warning">
					<th scop="col">Staff Name</th>
					<th scop="col">Pack ID</th>
					<th scop="col">No# of Items</th>
					<th scop="col">No# of Orders</th>
					<th scop="col">UPO</th>
					<th scop="col">UPH</th>
					<th scop="col">Total Time</th>
			</tr>
      </thead><tbody>`];
  const dataForChart = [];


  const grandAverageItems = [];
  const grandAverageOrders = [];
  const grandAverageUph = [];
  const grandAverageUpo = [];
  const grandAverageTotalTime = [];

  const packIds = Object.keys(data);
  let grandTotalTimeHr = 0;
  let grandTotalOfItems = 0;
  let grandTotalOfOrders = 0;

  tableHtml.push(Object.entries(data).slice().filter(([packerName, packerData]) => Object.keys(packerData['orders']).length > 2)
    .map(([packerName, packerData]) => {
      const packerId = packerData['items'][0]['Packed by']
      const numberOfItems = packerData['items'];
      const numberOfOrders = Object.keys(packerData['orders']);
      const upo = numberOfItems.length / numberOfOrders.length;
      const totalTimeInHr = getTotalTime(packerData)
      const uph = numberOfItems.length / totalTimeInHr

      // Grand Total Values
      grandTotalOfItems += numberOfItems.length
      grandTotalOfOrders += numberOfOrders.length
      grandTotalTimeHr += totalTimeInHr;

      // Data for Charts
      dataForChart.push({ name: packerName, uph: uph.toFixed(2) })

      //Grand Average values
      grandAverageItems.push(numberOfItems.length);
      grandAverageOrders.push(numberOfOrders.length);
      grandAverageUph.push(uph);
      grandAverageUpo.push(upo);
      grandAverageTotalTime.push(totalTimeInHr)

      return `    
                <tr>
						<th scop="row">${capitalize(packerName)}</th>
						<td>${packerId}</td>
						<td>${numberOfItems.length}</td>
						<td>${numberOfOrders.length}</td>
						<td >${upo.toFixed(2)}</td>
						<td >${uph.toFixed(2)}</td>
						<td >${toHoursAndMinutes(totalTimeInHr)} hr</td>
				</tr>`
    }).join(''));
  tableHtml.push(`</tbody><tfoot>
				<tr class="table-success">
						<th>Grand Total</th>
						<th>Total Packers: ${packIds.length}</th>
						<th>${grandTotalOfItems}</th>
						<th>${grandTotalOfOrders}</th>
						<th>-</th>
						<th>-</th>
						<th>${toHoursAndMinutes(grandTotalTimeHr)} hr</th>
				</tr>`)
  tableHtml.push(`
				<tr class="table-warning">
        <th>Grand Average</th>
        <th>-</th>
        <th>${(grandAverageItems.reduce((a, v) => a + v, 0) / grandAverageItems.length).toFixed(2)}</th>
        <th>${(grandAverageOrders.reduce((a, v) => a + v, 0) / grandAverageOrders.length).toFixed(2)}</th>
        <th>${(grandAverageUpo.reduce((a, v) => a + v, 0) / grandAverageUpo.length).toFixed(2)}</th>
        <th>${(grandAverageUph.reduce((a, v) => a + v, 0) / grandAverageUph.length).toFixed(2)}</th>
        <th>${toHoursAndMinutes(Math.floor(grandTotalTimeHr / grandAverageTotalTime.length))} hr</th>
				</tr>`)
  tableHtml.push('</tfoot></table></div>')
  tableElement.innerHTML = tableHtml.join('');
  document.querySelector('#btn-filter-break').disabled = false




  // Charts
  // makeChart(dataForChart);
  apexCharts(dataForChart)
  spinner.innerHTML = ""

}