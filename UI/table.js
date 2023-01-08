import { capitalize, toHoursAndMinutes } from "../scripts/helpers.js";

export const makeTable = (packers) => {
  packers.sort((a, b) => b.numberOfItems.length - a.numberOfItems.length)
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

  const grandTotalHr = packers.reduce((a, v) => a + v['totalTimeInHr'], 0);
  const grandTotalUph = packers.reduce((a, v) => a + v['uph'], 0);
  const grandTotalUpo = packers.reduce((a, v) => a + v['upo'], 0);
  const grandTotalItems = packers.reduce((a, v) => a + v['numberOfItems'].length, 0);
  const grandTotalOrders = packers.reduce((a, v) => a + Object.values(v['numberOfOrders']).length, 0);

  tableHtml.push(packers.map(packer => {
    const {
      packerName,
      packerId,
      numberOfItems,
      numberOfOrders,
      totalTimeInHr,
      upo,
      uph
    } = packer

    return `
    <tr>
    <th scop="row">${capitalize(packerName)}</th>
    <td>${packerId}</td>
    			<td>${numberOfItems.length}</td>
    			<td>${Object.keys(numberOfOrders).length}</td>
    			<td>${upo.toFixed(2)}</td>
    			<td>${uph.toFixed(2)}</td>
    			<td>${toHoursAndMinutes(totalTimeInHr)} hr</td>
    	</tr>`
  }).join(""))


  tableHtml.push(`</tbody><tfoot>
  			<tr class="table-success">
  					<th>Grand Total</th>
  					<th>Total Packers: ${packers.length}</th>
  					<th>${grandTotalItems}</th>
  					<th>${grandTotalOrders}</th>
  					<th>-</th>
  					<th>-</th>
  					<th>${toHoursAndMinutes(grandTotalHr)} hr</th>
  			</tr>`)
  tableHtml.push(`
  			<tr class="table-warning">
        <th>Grand Average</th>
        <th>-</th>
        <th>${(grandTotalItems / packers.length).toFixed(2)}</th>
        <th>${(grandTotalOrders / packers.length).toFixed(2)}</th>
        <th>${(grandTotalUpo / packers.length).toFixed(2)}</th>
        <th>${(grandTotalUph / packers.length).toFixed(2)}</th>
        <th>${toHoursAndMinutes(Math.floor(grandTotalHr / packers.length))} hr</th>
  			</tr>`)
  tableHtml.push('</tfoot></table></div>')
  tableElement.innerHTML = tableHtml.join('');

}

