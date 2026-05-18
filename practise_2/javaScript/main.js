import { drawSmile } from './image.js'
import { changeToAnimationForm, removeAnimationForm, changeToRouteForm, changeToOrigForm} from './form.js'
import { drawPath, translateAlong } from './path.js'

const runAnimation = (dataForm) => {
    const selectedAnimation = d3.select('#selectAnimation').property('value')
    const spdAnim = +dataForm.speedAnimation.value

    if (spdAnim <= 0) spdAnim = 1; 

    const svg = d3.select("svg")
    let pict = drawSmile(svg);

    let easeFunction
    switch (selectedAnimation) {
        case 'easeLinear':
            easeFunction = d3.easeLinear
            break
        case 'easeBounce':
            easeFunction = d3.easeBounce
            break
        case 'easeElastic':
            easeFunction = d3.easeElastic
            break
    }

    const baseDuration = 10000;
    const durationMs = baseDuration / spdAnim;
    
    let path = drawPath();
    
    pict.transition()
        .duration(durationMs)
        .ease(easeFunction)
        .attrTween('transform', translateAlong(
            path.node(),
            dataForm.sx.value,        // начальный масштаб X
            dataForm.sy.value,        // начальный масштаб Y
            dataForm.sx_final.value,  // конечный масштаб X
            dataForm.sy_final.value,  // конечный масштаб Y
            dataForm.corner.value,    // начальный угол
            dataForm.corner_final.value // конечный угол
        ));
}

document.addEventListener("DOMContentLoaded", () => {

    const width = 1000;
    const height = 1000;
    const svg = d3.select("svg").attr("width", width).attr("height", height);

    const settingForm = d3.select('#setting')
    const checkboxAnimation = d3.select('#fieldAnimation')

    checkboxAnimation.property('checked', false)

    changeToAnimationForm()
    changeToRouteForm()
    
    if (resetSettingsButton) {
        resetSettingsButton.addEventListener('click', () => {
            svg.selectAll('*').remove()
        })
    }

    if (animateButton) {
        animateButton.addEventListener('click', () => {
            runAnimation(settingForm.node())
        })
    }
})

