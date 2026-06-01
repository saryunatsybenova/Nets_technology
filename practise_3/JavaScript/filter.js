import { buildings } from "./data.js"
import { createTable, clearTable, createHeaderTable} from "./table.js"
// устанавливаем соответствие между полями формы и столбцами таблицы
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
/* Структура возвращаемого ассоциативного массива:
{
    input_id: input_value,
    ...
}
*/
const dataFilter = (dataForm) => {
    let dictFilter = {}

    // перебираем все элементы формы с фильтрами
    for (const item of dataForm.elements) {
        // получаем значение элемента
        let valInput = item.value

        // если поле типа text - приводим его значение к нижнему регистру
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
        // формируем очередной элемент ассоциативного массива
        dictFilter[item.id] = valInput
    }
    return dictFilter
}

// фильтрация таблицы
export const filterTable = (data, idTable, dataForm) => {
    
    // получаем данные из полей формы
    const datafilter = dataFilter(dataForm)
    
    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {
        
        /* в этой переменной будут "накапливаться" результаты сравнения данных
           с параметрами фильтра */
        let result = true

        // строка соответствует фильтру, если сравнение всех значения из input 
        // со значением ячейки очередной строки - истина
        Object.entries(item).map(([key, val]) => {

            // текстовые поля проверяем на вхождение
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
        // показать на странице таблицу с отфильтрованными строками
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