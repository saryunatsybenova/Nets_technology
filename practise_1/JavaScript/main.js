import { createTable, clearTable } from "./table.js";
import { filterTable, clearFilter } from './filter.js'
import { buildings } from './data.js'
import { sortTable, clearSort } from './sort.js'

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

const setSortSelect = (arr, sortSelect) => {
    sortSelect.append(createOption('Нет', 0));
    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
}

const setSortSelects = (data, dataForm) => {
    const head = Object.keys(data);
    const allSelect = dataForm.getElementsByTagName('select');
    for(let i = 0; i < allSelect.length; i++) {
        const item = allSelect[i];
        setSortSelect(head, item);
        if (i > 0) {
            item.disabled = true;
        }
    }
}

const changeNextSelect = (curSelect, nextSelectId, dataForm) => {
    let nextSelect = document.getElementById(nextSelectId);
    nextSelect.disabled = false;    
    nextSelect.innerHTML = curSelect.innerHTML;
    if (curSelect.value != 0) {
        console.log(curSelect.value)
        let options = nextSelect.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === curSelect.value) {
                nextSelect.remove(i);
                break;
            }
        }
    } else {
        const allSelect = dataForm.getElementsByTagName('select');
        let currentIndex = Array.from(allSelect).indexOf(curSelect);
        for(let i = currentIndex + 1; i < allSelect.length; i++) {
            allSelect[i].disabled = true;
            allSelect[i].value = '0'
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const filterForm = document.getElementById('filter')
    const sortForm = document.getElementById('sort')
    const allSelect = document.getElementsByTagName('select')
    
    createTable(buildings, 'list')
    setSortSelects(buildings[0], sortForm)

    allSelect[0].addEventListener('change', () => {
        changeNextSelect(allSelect[0], 'fieldsSecond', sortForm)
    })

    allSelect[1].addEventListener('change', () => {
        changeNextSelect(allSelect[1], 'fieldsThird', sortForm)
    })

    if (resetFiltersButton) {
        resetFiltersButton.addEventListener('click', () => {
            clearFilter('list', buildings, filterForm)
            clearSort(buildings, 'list', sortForm)
        })
    }
    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', () => {
            filterTable(buildings, 'list', filterForm)
            clearSort(buildings, 'list', sortForm)
        })
    }
    if (applySortButton){
        applySortButton.addEventListener('click', () => {
            sortTable('list', sortForm)
        })
    }
    if (resetSortButton){
        resetSortButton.addEventListener('click', () => {
            clearFilter('list', buildings, filterForm)
            clearSort(buildings, 'list', sortForm)
            clearTable('list')
            createTable(buildings, 'list')
        })
    }
})