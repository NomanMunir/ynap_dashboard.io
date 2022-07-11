const getTotalTime = (packerData) => {

    let breakTime = document.querySelector('#break-time').value;
    breakTime = +breakTime * 1000 * 60;
    let totalTimeInMs = 0;

    Object.values(packerData['orders']).forEach((orderData, currentIndex, array) => {
        let nextIndex = currentIndex + 1
        if (nextIndex >= array.length - 1) {
            nextIndex = array.length - 1
        }
        const currentOrder = new Date(array[currentIndex][0]['Packing End']);
        const nextOrder = new Date(array[nextIndex][0]['Packing End']);
        const diffBtwOrders = nextOrder - currentOrder
        if (diffBtwOrders > 0 && diffBtwOrders < breakTime) {
            totalTimeInMs += diffBtwOrders
        }
    })
    return totalTimeInMs;
}
const toHoursAndMinutes = (ms) => {
    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    }
    const totalMinutes = Math.floor(ms / 60000);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}