const colors = ['red', 'green', 'blue']

function createArrGraph(data, key) {
    let groupObj = d3.group(data, d => d[key]);
    let arrGraph =[];
    for(let entry of groupObj) {
        let minMax = d3.extent(entry[1].map(d => d['Популярность']));
        arrGraph.push({labelX : entry[0], values : minMax});
    }
    return arrGraph;
}

export function drawGraph(keyX, data, height, typeChart) {
    let arrGraph = createArrGraph(data, keyX);
    if (keyX == 'Время приготовления') {
        arrGraph = arrGraph.sort((a, b) => a['labelX'] - b['labelX'])
    }
    let svg = d3.select("svg")
    svg.selectAll('*').remove();
    let attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    }
    const [scX, scY] = createAxis(svg, arrGraph, attr_area, height);
    height.map((elem, index) => {
        switch(typeChart) {
            case 'Точечная':
                createChart(svg, arrGraph, scX, scY, attr_area, colors[index], elem.value)
                break
            case "Гистограмма":
                createChartGist(svg, arrGraph, scX, scY, attr_area, colors[index], elem.value)
                break
            case 'График':
                createChartGraph(svg, arrGraph, scX, scY, attr_area, colors[index], elem.value)
                break
        }
    })
}

function createAxis(svg, data, attr_area, height){
    // const [fmin, max] = d3.extent(data.map(d => d.values[1]));
    // const [min, fmax] = d3.extent(data.map(d => d.values[0]));
    let [min, max] = (height[0].value === 'Максимальная популярность') ? d3.extent(data.map(d => d.values[1])) : d3.extent(data.map(d => d.values[0]));
    console.log(height[0])
    console.log(min)
    const scaleX = d3.scaleBand()
    .domain(data.map(d => d.labelX))
    .range([0, attr_area.width - 2 * attr_area.marginX]);

    const scaleY = d3.scaleLinear()
    .domain([min * 0.85, max * 1.1 ])
    .range([attr_area.height - 2 * attr_area.marginY, 0]);

    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);
    svg.append("g")
    .attr("transform", `translate(${attr_area.marginX},
    ${attr_area.height - attr_area.marginY})`)
    .call(axisX)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", d => "rotate(-45)");
    svg.append("g")
    .attr("transform", `translate(${attr_area.marginX},
    ${attr_area.marginY})`)
    .call(axisY);
    return [scaleX, scaleY]
}

function createChart(svg, data, scaleX, scaleY, attr_area, color, height) {
    const r = 4;
    svg.selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", r)
    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 - ((height === 'Максимальная популярность') ? 4 : 0))
    .attr("cy", d => scaleY(d.values[(height === 'Максимальная популярность') ? 1 : 0]))
    .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
    .style("fill", color)
}

function createChartGist(svg, data, scaleX, scaleY, attr_area, color, height) {
    svg.selectAll(".dot")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 - ((height === 'Максимальная популярность') ? 8 : 0))
    .attr("y", d => scaleY(d.values[(height === 'Максимальная популярность') ? 1 : 0]))
    .attr("width", 8)
    .attr("height", d => {
        const yPos = scaleY(d.values[(height === 'Максимальная популярность') ? 1 : 0]);
        const yAxisBottom = scaleY.range()[0];
        return yAxisBottom - yPos;
    })
    .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
    .style("fill", color)
}

function createChartGraph(svg, data, scaleX, scaleY, attr_area, color, height) {
    let lineF = d3.line()
    .curve(d3.curveCardinal)
    .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2 - ((height === 'Максимальная популярность') ? 4 : 0))
    .y(d => scaleY(d.values[(height === 'Максимальная популярность') ? 1 : 0]))

    let chart = svg.append('path')
    .datum(data)
    .attr('d', lineF)
    .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
    .style('stroke-width', '2')
    .style('stroke', color)
}