import { createTable, clearTable } from "./table.js";
import { filterTable, clearFilter } from './filter.js'
import { buildings } from './data.js'
import { sortTable, clearSort } from './sort.js'
import { chartUtils, formUtils } from './index.js'

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

    formUtils.createForm()

    allSelect[0].addEventListener('change', () => {
        changeNextSelect(allSelect[0], 'fieldsSecond', sortForm)
    })

    allSelect[1].addEventListener('change', () => {
        changeNextSelect(allSelect[1], 'fieldsThird', sortForm)
    })

    if (resetFiltersButton) {
        d3.select('#resetFiltersButton').on('click', () => {
            clearFilter('list', buildings, filterForm)
            clearSort(buildings, 'list', sortForm)
        })
    }
    if (applyFiltersButton) {
        d3.select('#applyFiltersButton').on('click', () => {
            filterTable(buildings, 'list', filterForm)
            clearSort(buildings, 'list', sortForm)
        })
    }
    if (applySortButton){
        d3.select('#applySortButton').on('click', () => {
            sortTable('list', sortForm)
        })
    }
    if (resetSortButton){
        d3.select('#resetSortButton').on('click', () => {
            clearFilter('list', buildings, filterForm)
            clearSort(buildings, 'list', sortForm)
            clearTable('list')
            createTable(buildings, 'list')
        })
    }

    d3.selectAll('input[type="checkbox"]').on('change', () => {
        d3.select('#settingY')
        .selectAll('label')
        .style('color', 'black')
    })

    if (showChartButton){
        d3.select('#showChartButton').on('click', () => {
            const checkedSettings = d3.selectAll('input[type="checkbox"]:checked').nodes()
            const selectedRadio = d3.select('input[type="radio"]:checked').node()
            const selectedOption = d3.select('#selectTypeChart').property('value')
            if (checkedSettings.length === 0) {
                d3.select('#settingY')
                .selectAll('label')
                .style('color', 'red')
                throw new Error('Выберите чекбокс!!!')
            }
            else {
                d3.selectAll('label')
                .style('color', 'black')
                chartUtils.drawGraph(selectedRadio.value, buildings, checkedSettings, selectedOption)
            }
        })
    }
})