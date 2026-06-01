import { createTable, clearTable } from './table.js'
import { buildings } from './data.js';

/*формируем массив для сортировки по двум уровням вида 
  [
    {column: номер столбца, по которому осуществляется сортировка, 
     direction: порядок сортировки (true по убыванию, false по возрастанию)
    }, 
    ...
   ]
*/
const createSortArr = (data) => {
    let sortArr = [];
    const sortSelects = data.getElementsByTagName('select');
    for (const item of sortSelects) {
        // получаем номер выбранной опции
        const keySort = item.value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем порядок сортировки очередного уровня
        // имя флажка сформировано как имя поля SELECT и слова Desc
        const desc = document.getElementById(item.id + 'Desc').checked;
        // очередной элемент массива - по какому столбцу и в каком порядке сортировать 
        sortArr.push(
            {column: keySort - 1,
            direction: desc}
        );
    }
    return sortArr;
}

let originalTableHTML = ''

export const sortTable = (idTable, formData) => {

    // формируем управляющий массив для сортировки
    const sortArr = createSortArr(formData);

    //находим нужную таблицу
    let table = document.getElementById(idTable);

    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        if (originalTableHTML) {
            table.innerHTML = originalTableHTML;
        }
        return false;
    }

    if (!originalTableHTML) {
        originalTableHTML = table.innerHTML;
    }

    // преобразуем строки таблицы в массив 
    let rowData = Array.from(table.rows);
    // удаляем элемент с заголовками таблицы
    const headerRow = rowData.shift();
    
    //сортируем данные по всем уровням сортировки
    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
            const firstCell = first.cells[column].innerHTML;
            const secondCell = second.cells[column].innerHTML;
            const firstNum = parseFloat(firstCell);
            const secondNum = parseFloat(secondCell);
            
            if (column == 7 || column == 4) {
                if (firstNum < secondNum) return direction ? 1 : -1;
                if (firstNum > secondNum) return direction ? -1 : 1;
            } else {
                // используем localeCompare для корректного сравнения
                const comparison = firstCell.localeCompare(secondCell);
                // учитываем направление сортировки
                if (comparison !== 0) {
                    return direction ? -comparison : comparison;
                }
            }
        }
        return 0;
    });

    //выводим отсортированную таблицу на страницу
    table.append(headerRow);
    let tbody = document.createElement('tbody');
    rowData.forEach(item => {
        tbody.append(item);
    });
    table.append(tbody);
}

export const clearSort = (data, idTable, dataForm) => {
    const sortForm = document.getElementById('sort');
    
    if (sortForm) {
        const selects = sortForm.getElementsByTagName('select');
        for (let select of selects) {
            select.value = '0';
        }
        const checkboxes = sortForm.querySelectorAll('input[type="checkbox"]');
        for (let checkbox of checkboxes) {
            checkbox.checked = false;
        }
        const allSelect = dataForm.getElementsByTagName('select');
        for(let i = 0; i < allSelect.length; i++) {
            const item = allSelect[i];
            if (i > 0) {
                item.disabled = true;
            }
        }
    }
}