const makeChart = (data) => {
    document.getElementById('charts').innerHTML = '<div class="shadow-sm"><canvas id="myChart" width="1000" height="800"></canvas></div>'
    //sort packer by high uph
    const top10 = data.sort((firstPerson, secondPerson) => +secondPerson['uph'] - +firstPerson['uph']).slice(0, 9)

    const month = new Date(CONFIG.parsedData[0]["Packing End"]).toLocaleString('default', { month: 'long' });
    const year = new Date(CONFIG.parsedData[0]["Packing End"]).getFullYear();

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: top10.map(item => item.name.toUpperCase()),
            datasets: [{
                label: `Top Ten Packers of ${month}`,
                data: top10.map(item => item["uph"]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    return myChart
}

const apexCharts = (data) => {
    document.getElementById('charts').innerHTML = ""
    // document.getElementById('charts').innerHTML = '<div class="shadow-sm"><canvas id="myChart" width="1000" height="800"></canvas></div>'
    const top10 = data.sort((firstPerson, secondPerson) => +secondPerson['uph'] - +firstPerson['uph']).slice(0, 9)
    const options = {

        chart: {
            type: 'bar',
            height: 500,
            width: 600,
            // dropShadow: {
            //     enabled: true,
            //     top: 0,
            //     left: 0,
            //     blur: 3,
            //     opacity: 0.5
            // }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        series: [{
            name: 'UPH',
            data: top10.map(item => item["uph"]),
            // data: [1, 3, 40, 23, 45, 23, 43, 53, 45, 12],
        }],
        xaxis: {
            categories: top10.map(item => item.name.toUpperCase()),
        }
    }
    const chart = new ApexCharts(document.querySelector("#charts"), options);
    chart.render();
}

