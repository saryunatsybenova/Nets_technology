import { createTable, clearTable } from './table.js'
import { buildings } from './data.js';

const createSortArr = (data) => {
    let sortArr = [];
    const sortSelects = data.getElementsByTagName('select');
    for (const item of sortSelects) {
        const keySort = item.value;
        if (keySort == 0) {
            break;
        }
        const desc = document.getElementById(item.id + 'Desc').checked;
        sortArr.push(
            {column: keySort - 1,
            direction: desc}
        );
    }
    return sortArr;
}

let originalTableHTML = ''

export const sortTable = (idTable, formData) => {
    const sortArr = createSortArr(formData);
    let table = document.getElementById(idTable);
    if (sortArr.length === 0) {
        if (originalTableHTML) {
            table.innerHTML = originalTableHTML;
        }
        return false;
    }

    if (!originalTableHTML) {
        originalTableHTML = table.innerHTML;
    }

    let rowData = Array.from(table.rows);
    const headerRow = rowData.shift();
    
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
                const comparison = firstCell.localeCompare(secondCell);
                if (comparison !== 0) {
                    return direction ? -comparison : comparison;
                }
            }
        }
        return 0;
    });

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