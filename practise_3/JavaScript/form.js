const valX = ['Кухня', 'Время приготовления']
const valY = ['Максимальная популярность', "Минимальная популярность"]
const chartList = ['Точечная', 'Гистограмма', 'График']

export const createForm = () => {
    d3.select('body')
    .insert('form', 'svg')
    .attr('id', 'setting')

    d3.select('#setting')
    .append('div')
    .append('p')
    .text('Значение по оси X')
    .attr('id', "settingX")

    d3.select('#settingX')
    .selectAll('div.radio-group')
    .data(valX)
    .enter()
    .append('div')
    .attr('class', 'radio-group')
    .html(d => `
        <label>
            <input type="radio" name="choiceX" value='${d}'>
            ${d}
        <label>
    `)

    d3.select('input[type="radio"]')
    .property('checked', true)

    d3.select('#setting')
    .append('div')
    .append('p')
    .text('Значение по оси Y')
    .attr('id', "settingY")

    d3.select('#settingY')
    .selectAll('div')
    .data(valY)
    .enter()
    .append('div')
    .html(d => `
        <label>
            <input type="checkbox" value="${d}">
            ${d}
        </label>
    `)

    d3.select('#setting')
    .append('div')
    .text('Тип Графика')
    .append('select')
    .attr('id', 'selectTypeChart')
    .selectAll('option')
    .data(chartList)
    .enter()
    .append('option')
    .attr('value', d => d)
    .text(d => d)

    d3.select('#setting')
    .append('input')
    .attr('type', 'button')
    .attr('value', 'Построить')
    .attr('id', 'showChartButton')
    .style('margin-left', '0px')
    .style('margin-top', '25px')
}