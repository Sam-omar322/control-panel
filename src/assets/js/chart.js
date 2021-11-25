import "../../../node_modules/chart.js/dist/Chart.min.js";

(function() {
    const chartCanvas = document.querySelector("#example-chart");
    const dataValue = JSON.parse(chartCanvas.parentElement.dataset.values);
    const brandColor = (window.getComputedStyle(chartCanvas)).getPropertyValue('--color-brand') || "#2541b2";

    const chart = new Chart(chartCanvas, {
        type: "line",
        data: {
            labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
            datasets: [{
                label: "مبيعات الشهر",
                data: dataValue,
                borderColor: brandColor,
                backgroundColor: "transparent",
                lineTension: 0.3
            }]
        },
        options: {
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    display: false,
                }],
                xAxes: [{
                    position: "top"
                }]
            }
        }
    });

    // change chart values when arrow btn clicked
    const arrows = document.querySelector(".c-table__navigation");
    const randomValues = (start, end) => Array.from({length: start}, () => Math.round(Math.random()*end));
    arrows.addEventListener("click", () => {
        chart.data.datasets[0].data = randomValues(12, 1200);
        chart.update();
    });
})();