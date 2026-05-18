export function drawSmile(svg) {
    let smile = svg.append("g")
        .style("stroke", "black")
        .style("stroke-width", 1.5);

    smile.append("rect")
        .attr("x", -15)
        .attr("y", -40)
        .attr("width", 30)
        .attr("height", 60)
        .style("fill", "lightgray");
    
    smile.append("polygon")
        .attr("points", "-15,-40 15,-40 0,-70")
        .style("fill", "crimson");
    
    smile.append("polygon")
        .attr("points", "-15,20 -40,40 -15,40")
        .style("fill", "crimson");
    
    smile.append("polygon")
        .attr("points", "15,20 40,40 15,40")
        .style("fill", "crimson");
    
    smile.append("circle")
        .attr("cx", 0)
        .attr("cy", -15)
        .attr("r", 10)
        .style("fill", "lightblue")
        .style("stroke", "darkblue");
    
    smile.append("polygon")
        .attr("points", "-10,20 0,45 10,20")
        .style("fill", "orange")
        .style("stroke", "none");
    
    smile.append("polygon")
        .attr("points", "-5,20 0,35 5,20")
        .style("fill", "yellow")
        .style("stroke", "none");

    return smile;
}