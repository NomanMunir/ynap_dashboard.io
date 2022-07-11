const makeChart = (data) => {
    document.getElementById('charts').innerHTML = '<canvas id="myChart" width="1000" height="800"></canvas>'
    //sort packer by high uph
    const top10 = data.sort((firstPerson, secondPerson) => +secondPerson['uph'] - +firstPerson['uph']).slice(0, 9)

    const month = new Date("2/28/2022").toLocaleString('default', { month: 'long' });
    const year = new Date("2/28/2022").getFullYear();

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: top10.map(item => item.name.toUpperCase()),
            datasets: [{
                label: 'Top Ten Packer',
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
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    return myChart
}
