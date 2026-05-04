export const createTable = (data, idTable) => {
    const table = document.getElementById(idTable)
    const header = Object.keys(data[0])
    const headerRow = createHeaderRow(header)
    table.append(headerRow)
    const bodyRows = createBodyRows(data)
    table.append(bodyRows)
}

export const createHeaderTable = (data, idTable) => {
    const table = document.getElementById(idTable)
    const header = Object.keys(data[0])
    const headerRow = createHeaderRow(header)
    table.append(headerRow)
}

const createHeaderRow = (headers) => {
    const tr = document.createElement('tr')
    headers.forEach(header => {
        const th = document.createElement('th')
        th.innerHTML = header
        tr.append(th)
    })
    return tr
}

const createBodyRows = (data) => {
    let body = document.createElement('tbody')
    data.forEach(obj => {
        const tr = document.createElement('tr')
        for (let key in obj) {
            const td = document.createElement('td')
            td.innerHTML = obj[key]
            tr.append(td)
        }
        body.append(tr)
    })
    return body
}

export const clearTable = (idTable) => {
    let table = document.getElementById(`${idTable}`)
    while(table.rows.length > 0) {
        table.deleteRow(0)
    }
}