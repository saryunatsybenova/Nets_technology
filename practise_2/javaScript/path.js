function createPathParabola() {
    const svg = d3.select("svg")
    const width = +svg.attr("width")
    const height = +svg.attr("height")
    let data = [];

    const h = width / 2;      
    const k = height * 0.65;     
    const p = width * 0.35;     
    const a = (k - height * 0.25);  

    for (let t = 1; t >= -1; t -= 0.04) {
        const x = h + p * t;
        const y = k - a * t * t;

        data.push({ x, y });
    }
    return data;
}

export const drawPath =() => {
    const dataPoints = createPathParabola()

    const svg = d3.select("svg");

    const line = d3.line()
    .x((d) => d.x)
    .y((d) => d.y);
    const path = svg.append('path')
    .attr('d', line(dataPoints))
    .attr('stroke', 'black')
    .attr('fill', 'none');

    return path;
}

export function translateAlong(path, stXScale, stYScale, fnXScale, fnYScale, stRotate, fnRotate) {
    const length = path.getTotalLength();
    return function() {
        return function(t) {
            const scaleX = +stXScale + (+fnXScale - +stXScale) * t
            const scaleY = +stYScale + (+fnYScale - +stYScale) * t
            const rotate = +stRotate + (+fnRotate - +stRotate) * t
            const {x, y} = path.getPointAtLength(t * length);
            return `translate(${x},${y}) scale(${scaleX}, ${scaleY}) rotate(${rotate})`;
        }
    }
}