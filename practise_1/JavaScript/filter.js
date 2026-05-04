import { buildings } from "./data.js"
import { createTable, clearTable, createHeaderTable} from "./table.js"

const correspond = {
    "Название": "dish",
    "Кухня": "cousine",
    "Тип": "type",
    "Регион": "region",
    "Время приготовления": ["thermConductFrom", "yearTo"],
    "Сложность": "complexity",
    "Основные ингредиенты": "ingredients",
    "Популярность": ["priceFrom", "heightTo"]
}

const dataFilter = (dataForm) => {
    let dictFilter = {}

    for (const item of dataForm.elements) {
        let valInput = item.value

        if (item.type === 'text') {
            valInput = valInput.toLowerCase()
        }

        if (item.type === "number") {
            valInput = Number(valInput)
        }

        if (valInput == '') {
            if (item.id && item.id.includes('From')) {
                valInput = -Infinity
            }
            if (item.id && item.id.includes('To')) {
                valInput = +Infinity
            }
        }

        dictFilter[item.id] = valInput
    }
    return dictFilter
}

export const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm)
    let tableFilter = data.filter(item => {
        let result = true
        Object.entries(item).map(([key, val]) => {
            if (typeof val == 'string') {
                result &&= val.toLowerCase().includes(datafilter[correspond[key]])
            }
            if (typeof val == 'number') {
                if (key === "Время приготовления") {
                    let from = datafilter["thermConductFrom"]
                    let to = datafilter["yearTo"]
                    result &&= val >= from && val <= to
                }
                if (key === "Популярность") {
                    let from = datafilter["priceFrom"]
                    let to = datafilter["heightTo"]
                    result &&= val >= from && val <= to
                }
            }
        })
        return result
    })
    clearTable(idTable)
    if (tableFilter.length > 0) {
        createTable(tableFilter, idTable)
    }
    else {
        createHeaderTable(buildings, idTable)
    }
}

export const clearFilter = (idTable, data, dataForm) => {
    document.getElementById('filter').reset()
    clearTable('list')
    createTable(buildings, 'list')
}