export const changeToAnimationForm = () => {
    d3.select("#setting div:first-child p")
    .append("label")
    .attr("for", "cx_final")
    .attr("class", "extra-setting")
    .text("до ")
    .append("input")
    .attr("type", "number")
    .attr("id", "cx_final")
    .attr("class", "extra-setting")
    .attr("value", "300")
    .attr("max", "600")
    .attr("min", "0");

    d3.select("#setting div:first-child p:last-child")
    .append("label")
    .attr("for", "cy_final")
    .attr("class", "extra-setting")
    .text("до ")
    .append("input")
    .attr("type", "number")
    .attr("id", "cy_final")
    .attr("class", "extra-setting")
    .attr("value", "300")
    .attr("max", "600")
    .attr("min", "0");

    d3.select('#setting div:nth-child(2) p')
    .append('label')
    .attr('for', "sx_final")
    .attr("class", "extra-setting")
    .text("до ")
    .append("input")
    .attr("type", "number")
    .attr("id", "sx_final")
    .attr("class", "extra-setting")
    .attr("value", "1")
    .attr("max", "2")
    .attr("min", "0");

    d3.select('#setting div:nth-child(2) p:last-child')
    .append('label')
    .attr('for', "sy_final")
    .attr("class", "extra-setting")
    .text("до ")
    .append("input")
    .attr("type", "number")
    .attr("id", "sy_final")
    .attr("class", "extra-setting")
    .attr("value", "1")
    .attr("max", "2")
    .attr("min", "0");

    d3.select('#setting div:nth-child(3) p')
    .append('label')
    .attr('for', "corner_final")
    .attr("class", "extra-setting")
    .text("до ")
    .append("input")
    .attr("type", "number")
    .attr("id", "corner_final")
    .attr("class", "extra-setting")
    .attr("value", "180")
    .attr("max", "180")
    .attr("min", "0");

    d3.select('#setSettingsButton')
    .style('display', 'none')

    d3.select('#setting')
    .append('select')
    .attr('id', 'selectAnimation')
    .attr('class', 'extra-setting')
    
    d3.select('#selectAnimation')
    .append("option")
    .attr('value', 'easeLinear')
    .text('linear')

    d3.select('#selectAnimation')
    .append("option")
    .attr('value', 'easeElastic')
    .text('elastic')

    d3.select('#selectAnimation')
    .append("option")
    .attr('value', 'easeBounce')
    .text('Bounce')

    d3.select("#animateButton")
    .style("display", "block");

    d3.select("#checkboxRoute")
    .style("display", "inline");
}

export const removeAnimationForm = () => {
    d3.selectAll('#cx_final, #cy_final, #sx_final, #sy_final, #corner_final')
    .remove();
    
    d3.selectAll('.extra-setting').remove();
    
    d3.select('#selectAnimation').remove();
    
    d3.select('#setSettingsButton').style('display', 'block');

    d3.select("#animateButton")
    .style("display", "none");

    d3.select("#checkboxRoute")
    .style("display", "none");
}

export const changeToRouteForm = () => {
    d3.select('#coordCont').selectAll('*').remove()
    d3.select("#coordCont")
    .insert('p', ':first-child')
    .append('input')
    .attr('type', 'number')
    .attr('min', '1000')
    .attr('max', '6000')
    .attr('value', '1000')
    .attr('id', 'speedAnimation')

}

export const changeToOrigForm = () => {
    d3.selectAll('.route-setting').remove()
    d3.select('#coordCont').style('display', 'block')
    d3.select('#scaleCont').style('display', 'block')
    d3.select('#rotateCont').style('display', 'block')
}