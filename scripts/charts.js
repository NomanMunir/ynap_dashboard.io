
const uphChart = (packersData) => {
    document.getElementById('uph-charts').innerHTML = '<div class="shadow-sm m-3"><canvas id="cnv_uph_chart"></canvas></div>'
    //sort packer by high uph
    const packers = packersData.sort((firstPerson, secondPerson) => +secondPerson['uph'] - +firstPerson['uph'])
    const backgroundColor = packers.map(packer => chooseColorForUphChart(packer['uph']))
    const month = new Date(parsedData[0]["Packing End"]).toLocaleString('default', { month: 'long' });
    const year = new Date(parsedData[0]["Packing End"]).getFullYear();

    const ctx = document.getElementById('cnv_uph_chart').getContext('2d');
    ctx.font = "30px Arial";
    const myChart = new Chart(ctx, {
        type: "bar",
        plugins: [ChartDataLabels],
        data: {
            labels: packers.map(packer => packer.packerName.toUpperCase()),
            datasets: [{
                label: `UPH for ${month}`,
                data: packers.map(item => ~~item["uph"]),
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                // Change options for ALL labels of THIS CHART
                datalabels: {
                    anchor: "end",
                    align: "start",
                    color: '#00000',
                    textAlign: "center",
                    labels: {
                        title: {
                            font: {
                                weight: 'bold',
                                size: "15px"
                            }
                        },
                        // value: {
                        //     color: 'green'
                        // },
                    },
                    formatter: function (value, context) {
                        console.log(context)
                        let name = context.chart.config._config.data.labels[context.dataIndex];
                        return [value, "\n\n", Array.from(name).join(" \n ")];
                    }
                }
            },
            indexAxis: "x",
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

const perfChart = (packersData) => {
    document.getElementById('perf-charts').innerHTML = '<div class="shadow-sm"><canvas id="cnv_perf_chart"></canvas></div>'
    //sort packer by performance 
    const data = monthPerformance(packersData)
    const packers = data.sort((firstPerson, secondPerson) => +secondPerson['totalAvg'] - +firstPerson['totalAvg'])
    const backgroundColor = packers.map(packer => chooseColorForPerfChart(packer['totalAvg']))
    const month = new Date(parsedData[0]["Packing End"]).toLocaleString('default', { month: 'long' });
    const year = new Date(parsedData[0]["Packing End"]).getFullYear();

    const ctx = document.getElementById('cnv_perf_chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: packers.map(packer => packer.packerName.toUpperCase()),
            datasets: [{
                label: `Performance for ${month}`,
                data: packers.map(item => item["totalAvg"]),
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: "x",
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


// const perfChart = (packers) => {
//     document.getElementById('sumup-charts').innerHTML = ""
//     const data = monthPerformance(packers)
//     const top10 = data.sort((firstPerson, secondPerson) => +secondPerson['totalAvg'] - +firstPerson['totalAvg'])
//     // document.getElementById('charts').innerHTML = '<div class="shadow-sm"><canvas id="myChart" width="1000" height="800"></canvas></div>'
//     const options = {

//         chart: {
//             type: 'bar',
//             height: 800,
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
//             shared: false,
//             intersect: false
//         },
//         series: [{
//             name: 'Performance',
//             data: top10.map(item => item["totalAvg"]),
//             // data: [1, 3, 40, 23, 45, 23, 43, 53, 45, 12],
//         }],
//         xaxis: {
//             categories: top10.map(item => item.packerName.toUpperCase()),
//         }
//     }
//     const perfChart = new ApexCharts(document.querySelector("#uph-charts"), options);
//     perfChart.render();
// }
