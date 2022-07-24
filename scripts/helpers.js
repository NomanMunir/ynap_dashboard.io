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
    return totalTimeInMs / 3600000;
}

const getDataforTable = () => {
    const results = (Object.entries(segregatedData).slice().filter(([packerName, packerData]) => Object.keys(packerData['orders']).length > 2)
        .reduce((result, [packerName, packerData]) => {

            const packerId = packerData['items'][0]['Packed by']
            const numberOfItems = packerData['items'];
            const numberOfOrders = packerData['orders'];
            const upo = numberOfItems.length / Object.keys(numberOfOrders).length;
            const totalTimeInHr = getTotalTime(packerData)
            const uph = numberOfItems.length / totalTimeInHr

            result.push(
                {
                    packerName,
                    packerId,
                    numberOfItems,
                    numberOfOrders,
                    totalTimeInHr,
                    upo,
                    uph
                }
            )
            return result
        }, []));
    return results
}
const monthPerformance = (packers) => {
    const packersAvgPerf = packers.reduce((a, packer) => {
        const avguph = averageOfUph(packer['uph'])
        const avgupo = averageOfUph(packer['upo'])
        const avgHr = sumOfTimeTaken(packer['totalTimeInHr'])
        a.push({
            packerName: packer['packerName'],
            totalAvg: avguph + avgupo + avgHr
        })
        return a
    }, [])
    return packersAvgPerf
}
const toHoursAndMinutes = (hr) => {
    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    }
    const totalMinutes = Math.floor(hr * 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return "";
        // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
/**
 * Capitalizes first letters of words in string.
 * @param {string} str String to be modified
 * @param {boolean=false} lower Whether all other letters should be lowercased
 * @return {string}
 * @usage
 *   capitalize('fix this string');     // -> 'Fix This String'
 *   capitalize('javaSCrIPT');          // -> 'JavaSCrIPT'
 *   capitalize('javaSCrIPT', true);    // -> 'Javascript'
 */
const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());

const averageOfUph = (uph) => {
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
const averageOfUpo = (upo) => {
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
const sumOfTimeTaken = (time) => {
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

const chooseColorForChart = (uph) => {
    let result;
    if (uph) {
        result = uph < 30 ? "#bc6c25"
            : uph >= 30 && uph <= 40 ? "#588157"
                : "#0077b6"
    }
    return result
} 