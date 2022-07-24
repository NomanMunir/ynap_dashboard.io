const makeChart = (packersData) => {
    document.getElementById('uph-charts').innerHTML = '<div class="shadow-sm"><canvas id="myChart" width="1000" height="800"></canvas></div>'
    //sort packer by high uph
    const packers = packersData.sort((firstPerson, secondPerson) => +secondPerson['uph'] - +firstPerson['uph'])
    const backgroundColor = packers.map(packer => chooseColorForChart(packer['uph']))
    console.log(backgroundColor);
    const month = new Date(parsedData[0]["Packing End"]).toLocaleString('default', { month: 'long' });
    const year = new Date(parsedData[0]["Packing End"]).getFullYear();

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: packers.map(packer => packer.packerName.toUpperCase()),
            datasets: [{
                label: `UPH for ${month}`,
                data: packers.map(item => item["uph"]),
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
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
        },
        animations: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        }
    });
    return myChart
}



// const uphChart = (packers) => {
//     document.getElementById('uph-charts').innerHTML = ""
//     // document.getElementById('charts').innerHTML = '<div class="shadow-sm"><canvas id="myChart" width="1000" height="800"></canvas></div>'
//     const top10 = packers.sort((firstPerson, secondPerson) => +secondPerson['uph'] - +firstPerson['uph'])
//     const optionsForUphChart = {

//         chart: {
//             type: 'bar',
//             height: 500,
//             width: 600,
//             // dropShadow: {
//             //     enabled: true,
//             //     top: 0,
//             //     left: 0,
//             //     blur: 3,
//             //     opacity: 0.5
//             // }
//         },
//         plotOptions: {
//             bar: {
//                 horizontal: true,
//                 dataLabels: {
//                     position: 'top',
//                 },
//             }
//         },
//         dataLabels: {
//             enabled: true,
//             offsetX: -6,
//             style: {
//                 fontSize: '12px',
//                 colors: ['#fff']
//             }
//         },
//         tooltip: {
//             shared: true,
//             intersect: false
//         },
//         series: [{
//             name: 'UPH',
//             data: top10.map(item => item["uph"].toFixed(2)),
//             // data: [1, 3, 40, 23, 45, 23, 43, 53, 45, 12],
//         }],
//         xaxis: {
//             categories: top10.map(item => item.packerName.toUpperCase()),
//         }
//     }
//     const chart = new ApexCharts(document.querySelector("#uph-charts"), optionsForUphChart);
//     chart.render();
// }


const perfChart = (packers) => {
    document.getElementById('sumup-charts').innerHTML = ""
    const data = monthPerformance(packers)
    // document.getElementById('charts').innerHTML = '<div class="shadow-sm"><canvas id="myChart" width="1000" height="800"></canvas></div>'
    const top10 = data.sort((firstPerson, secondPerson) => +secondPerson['totalAvg'] - +firstPerson['totalAvg'])
    const options = {

        chart: {
            type: 'bar',
            height: 800,
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
            shared: false,
            intersect: false
        },
        series: [{
            name: 'Performance',
            data: top10.map(item => item["totalAvg"]),
            // data: [1, 3, 40, 23, 45, 23, 43, 53, 45, 12],
        }],
        xaxis: {
            categories: top10.map(item => item.packerName.toUpperCase()),
        }
    }
    const perfChart = new ApexCharts(document.querySelector("#uph-charts"), options);
    perfChart.render();
}
