const charts = (packersData) => {
    //Html Elements for charts
    document.getElementById('uph-charts').innerHTML = '<div class="shadow-sm m-3"><canvas id="cnv_uph_chart"></canvas></div>'
    document.getElementById('perf-charts').innerHTML = '<div class="shadow-sm"><canvas id="cnv_perf_chart"></canvas></div>'

    //Currert year and Month
    const year = new Date(parsedData[0]["Packing End"]).getFullYear();
    const month = new Date(parsedData[0]["Packing End"]).toLocaleString('default', { month: 'long' });

    //Packer data sorterd
    const perfData = calcuOverallPerf(packersData)
    //sort by perf
    const perfPackers = perfData.sort((firstPerson, secondPerson) => +secondPerson['totalAvg'] - +firstPerson['totalAvg'])


    const uphPackers = packersData.sort((firstPerson, secondPerson) => +secondPerson['uph'] - +firstPerson['uph'])
    //Choose Background color for the charts bar
    const backgroundColorForUph = uphPackers.map(packer => chooseColorForUphChart(packer['uph']));
    const backgroundColorForPerf = perfPackers.map(packer => chooseColorForPerfChart(packer['totalAvg']));

    const uphChartData = {
        labels: uphPackers.map(packer => packer.packerName.toUpperCase()), //Packers Names
        datasets: [{
            label: `UPH for ${month}`,
            data: uphPackers.map(item => ~~item["uph"]),
            backgroundColor: backgroundColorForUph,
            borderColor: backgroundColorForUph,
            borderWidth: 1
        }]
    };

    const perfChartData = {
        labels: perfPackers.map(packer => packer.packerName.toUpperCase()),
        datasets: [{
            label: `Performance for ${month}`,
            data: perfPackers.map(item => item["totalAvg"]),
            backgroundColor: backgroundColorForPerf,
            borderColor: backgroundColorForPerf,
            borderWidth: 1
        }]
    };

    const chartsPlugins = {
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
                        size: "25rem"
                    }
                },
                //value: {
                //    color: 'white'
                //  },
            },
            formatter: function (value, context) {
                // console.log(context)
                let name = uphPackers[context.dataIndex]["packerName"];
                let uph = uphPackers[context.dataIndex]["uph"];
                return [value, Array.from(name).join(" \n ")].join("\n\n");
                return ["\n\n", "\n\n", value, "\n\n"];
                //,Math.round(uph)


            }
        }
    };
    const chartsOptions = {
        plugins: chartsPlugins,
        indexAxis: "x",
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    const chartsAnimation = {
        tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
        }
    }
    uphChart({ uphChartData, chartsOptions, chartsAnimation })
    perfChart({ perfChartData, chartsOptions, chartsAnimation })
}

const uphChart = ({ uphChartData, chartsOptions, chartsAnimation }) => {
    const ctx = document.getElementById('cnv_uph_chart').getContext('2d');

    const uphChart = new Chart(ctx, {
        type: "bar",
        plugins: [ChartDataLabels],
        data: uphChartData,
        options: chartsOptions,
        animations: chartsAnimation
    });
    return uphChart
}

const perfChart = ({ perfChartData, chartsOptions, chartsAnimation }) => {


    const ctx = document.getElementById('cnv_perf_chart').getContext('2d');
    const myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: "bar",
        data: perfChartData,
        options: chartsOptions,
        animations: chartsAnimation,
    });
    return myChart
}
const calcuOverallPerf = (packers) => {
    const packersAvgPerf = packers.reduce((a, packer) => {
        const avguph = calcuAvgOfUph(packer['uph'])
        const avgupo = calcuAvgOfUpo(packer['upo'])
        const avgHr = calcuAvgTime(packer['totalTimeInHr'])
        a.push({
            packerName: packer['packerName'],
            totalAvg: avguph + avgupo + avgHr
        })
        return a
    }, [])
    return packersAvgPerf
}

const calcuAvgOfUph = (uph) => {
    let result;
    if (uph) {
        result = uph <= 20 ? 15
            : uph >= 21 && uph <= 25 ? 43
                : uph >= 26 && uph <= 30 ? 55
                    : uph >= 31 && uph <= 35 ? 62
                        : uph >= 36 && uph <= 40 ? 63
                            : uph >= 41 && uph <= 45 ? 64
                                : 65
    }
    return result
}
const calcuAvgOfUpo = (upo) => {
    let result;
    if (upo) {
        result = upo <= 1 ? 20
            : upo >= 1.0001 && upo <= 2.00 ? 18
                : upo >= 2.0001 && upo <= 3.00 ? 17
                    : upo >= 3.0001 && upo <= 4.00 ? 8
                        : upo >= 4.0001 && upo <= 5.00 ? 6
                            : 5
    }
    return result
}
const calcuAvgTime = (time) => {
    let result;
    if (time) {
        result = time <= 50 ? 2
            : time >= 51 && time <= 100 ? 9
                : time >= 101 && time <= 125 ? 12
                    : time >= 126 && time <= 150 ? 14
                        : time >= 151 && time <= 175 ? 14
                            : time >= 176 && time <= 200 ? 15
                                : 15
    }
    return result
}

const chooseColorForUphChart = (uph) => {
    let result;
    if (uph) {
        result = uph < 25 ? "#F37878"
            : uph >= 25 && uph < 30 ? "#FFCC00"
                : uph >= 30 ? "#3CCF4E" : "#3CCF4E"
    }
    return result
}
const chooseColorForPerfChart = (perf) => {
    let result;
    if (perf) {
        result = perf < 75 ? "#F37878"
            : perf >= 75 && perf < 85 ? "#FFCC00"
                : perf >= 85 ? "#3CCF4E" : "#3CCF4E"
    }
    return result
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
