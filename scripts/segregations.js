const segregateByName = () => {
    const cleanAndSortedData = CONFIG.parsedData.sort((a, b) => {
        return new Date(a['Packing End']) - new Date(b["Packing End"])
    })
    const countOfItemByPackId = cleanAndSortedData
        .filter(order => order['Packer Name'] !== "undefined" && order['Packer Name'] !== 'null' && order['Packer Name'] !== '' && order["Packer Name"] !== undefined && order["Order ID"])
        .reduce((acc, order) => {
            const packerName = order['Packer Name'].toLowerCase().trim();
            const orders = order['Order Number']
            acc[packerName] = acc[packerName] || {};
            acc[packerName]["items"] = acc[packerName]["items"] || []
            acc[packerName]['orders'] = acc[packerName]['orders'] || {}
            acc[packerName]['orders'][orders] = acc[packerName]['orders'][orders] || []
            acc[packerName]["items"].push(order)
            acc[packerName]['orders'][orders].push(order)
            return acc
        }, {})
    CONFIG.segregatedData = countOfItemByPackId
    makeTable()
}