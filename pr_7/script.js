const InputType = {
    SIDE_ANGLE: 'side-angle',
    BASE_ANGLE: 'base-angle',
}

const inputErrorPairs = [
    ['lateralSide', 'lateralSideError'],
    ['baseAngle', 'baseAngleError'],
    ['base', 'baseError'],
    ['vertexAngle', 'vertexAngleError']
];

let form;
let currentInputType = InputType.SIDE_ANGLE; 

function initializePage() {
    showInputType(); 
}


function showInputType() {
    const inputType = form.inputType.value;
    currentInputType = inputType; 

    const imageSideAngle = document.getElementById("imageSideAngle");
    const imageBaseAngle = document.getElementById("imageBaseAngle");

    const inputsSideAngle = document.getElementById("inputsSideAngle");
    const inputsBaseAngle = document.getElementById("inputsBaseAngle");

    
    imageSideAngle.classList.add('triangle-image--hidden');
    imageBaseAngle.classList.add('triangle-image--hidden');
    inputsSideAngle.classList.add('calculator__section--hidden');
    inputsBaseAngle.classList.add('calculator__section--hidden');

    switch (String(inputType)) {
        case InputType.SIDE_ANGLE:
            imageSideAngle.classList.remove('triangle-image--hidden');
            inputsSideAngle.classList.remove('calculator__section--hidden');
            break;
        case InputType.BASE_ANGLE:
            imageBaseAngle.classList.remove('triangle-image--hidden');
            inputsBaseAngle.classList.remove('calculator__section--hidden');
            break;
    }

    resetResultsAndErrors();
}

function clearInputs() {
    form.lateralSide.value = '';
    form.baseAngle.value = '';
    form.base.value = '';
    form.vertexAngle.value = '';

    resetResultsAndErrors();
}

function resetResultsAndErrors() {
    document.getElementById('results').classList.remove('results--visible');
    hideGeneralError();
    hideCheckboxError();
    clearAllInputErrors();
}

function hideInputError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    input.classList.remove('input-field__input--error');
    error.classList.remove('input-field__error--visible');
}

function showGeneralError(message) {
    const error = document.getElementById('generalError');
    error.textContent = message;
    error.classList.add('error-box--visible');
}

function hideGeneralError() {
    const error = document.getElementById('generalError');
    error.textContent = '';
    error.classList.remove('error-box--visible');
}

function clearAllInputErrors() {
    inputErrorPairs.forEach(([inputId, errorId]) => hideInputError(inputId, errorId));
}

function showCheckboxError(message) {
    const error = document.getElementById('checkboxError');
    error.textContent = message;
    error.classList.add('error-box--visible');
}

function hideCheckboxError() {
    const error = document.getElementById('checkboxError');
    error.textContent = '';
    error.classList.remove('error-box--visible');
}

function validateSideAngle() {
    let isValid = true;

    const lateralSide = form.lateralSide.value;
    const baseAngle = form.baseAngle.value;

    if (lateralSide === '') {
        showError('lateralSide', 'lateralSideError', 'Введите значение');
        isValid = false;
    } else if (isNaN(parseFloat(lateralSide)) || parseFloat(lateralSide) <= 0) {
        showError('lateralSide', 'lateralSideError', 'Должно быть положительное число');
        isValid = false;
    }

    if (baseAngle === '') {
        showError('baseAngle', 'baseAngleError', 'Введите значение');
        isValid = false;
    } else if (isNaN(parseFloat(baseAngle))) {
        showError('baseAngle', 'baseAngleError', 'Введите число');
        isValid = false;
    } else if (parseFloat(baseAngle) <= 0 || parseFloat(baseAngle) >= 90) {
        showError('baseAngle', 'baseAngleError', 'Угол должен быть от 0 до 90 градусов не включительно');
        isValid = false;
    }

    return isValid;
}

function validateBaseAngle() {
    let isValid = true;

    const base = form.base.value;
    const vertexAngle = form.vertexAngle.value;

    if (base === '') {
        showError('base', 'baseError', 'Введите значение');
        isValid = false;
    } else if (isNaN(parseFloat(base)) || parseFloat(base) <= 0) {
        showError('base', 'baseError', 'Должно быть положительное число');
        isValid = false;
    }

    if (vertexAngle === '') {
        showError('vertexAngle', 'vertexAngleError', 'Введите значение');
        isValid = false;
    } else if (isNaN(parseFloat(vertexAngle))) {
        showError('vertexAngle', 'vertexAngleError', 'Введите число');
        isValid = false;
    } else if (parseFloat(vertexAngle) <= 0 || parseFloat(vertexAngle) >= 180) {
        showError('vertexAngle', 'vertexAngleError', 'Угол должен быть от 0 до 180 градусов не включительно');
        isValid = false;
    }

    return isValid;
}

function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    input.classList.add('input-field__input--error');
    error.textContent = message;
    error.classList.add('input-field__error--visible');
}

//вычисление основания
function calculateBaseFromSideAngle(lateralSide, baseAngleRad) {
    return 2 * lateralSide * Math.cos(baseAngleRad);
}

//вычисление боковой стороны
function calculateLateralFromBaseAngle(base, vertexAngleRad) {
    const baseAngleRad = (Math.PI - vertexAngleRad) / 2;
    return base / (2 * Math.cos(baseAngleRad));
}

//медианы
function calculateMedians(lateralSide, base) {
    const medianToBase = Math.sqrt(lateralSide**2 - (base/2)**2);
    const medianToLateral = Math.sqrt((2*lateralSide**2 + 2*(base/2)**2 - base**2) / 4);
    
    return {
        ma: medianToLateral, 
        mb: medianToBase,    
        mc: medianToLateral  
    };
}
//периметр
function calculatePerimeter(lateralSide, base) {
    return 2 * lateralSide + base;
}

function formatNumber(num) {
    return num.toFixed(4);
}

function calculate() {
    const inputType = currentInputType; 
    let lateralSide, base, vertexAngle, baseAngle;

    switch (inputType) {
        case InputType.SIDE_ANGLE:
            clearAllInputErrors();
            hideGeneralError();
            hideCheckboxError();

            if (!validateSideAngle()) return;

            lateralSide = parseFloat(form.lateralSide.value);
            baseAngle = parseFloat(form.baseAngle.value);
            
            const baseAngleRad = baseAngle * Math.PI / 180;
            
            vertexAngle = 180 - 2 * baseAngle;
            
            base = calculateBaseFromSideAngle(lateralSide, baseAngleRad);
            break;
            
        case InputType.BASE_ANGLE:
            clearAllInputErrors();
            hideGeneralError();
            hideCheckboxError();

            if (!validateBaseAngle()) return;

            base = parseFloat(form.base.value);
            vertexAngle = parseFloat(form.vertexAngle.value);
            
            const vertexAngleRad = vertexAngle * Math.PI / 180;
            
            baseAngle = (180 - vertexAngle) / 2;
            
            lateralSide = calculateLateralFromBaseAngle(base, vertexAngleRad);
            break;
    }

    const calcPerimeter = form.calcPerimeter.checked;
    const calcMedians = form.calcMedians.checked;
    const calcMissingSides = form.calcMissingSides.checked;

    if (!calcPerimeter && !calcMedians && !calcMissingSides) {
        showCheckboxError('Выберите хотя бы одну характеристику для вычисления');
        return;
    }

    let resultsHTML = '';

    const medians = calculateMedians(lateralSide, base);

    if (calcMissingSides) {
        resultsHTML += `
            <div class="result-item">
                <span class="result-item__label">Стороны треугольника:</span><br>
                <span class="result-item__value">AB = AC = ${formatNumber(lateralSide)}</span><br>
                <span class="result-item__value">BC = ${formatNumber(base)}</span><br>
                <span class="result-item__value">Угол при основании: ${formatNumber(baseAngle)}°</span><br>
                <span class="result-item__value">Угол при вершине: ${formatNumber(vertexAngle)}°</span>
            </div>
        `;
    }

    if (calcPerimeter) {
        const perimeter = calculatePerimeter(lateralSide, base);
        resultsHTML += `
            <div class="result-item">
                <span class="result-item__label">Периметр:</span><br>
                <span class="result-item__value">P = ${formatNumber(perimeter)}</span>
            </div>
        `;
    }

    if (calcMedians) {
        resultsHTML += `
            <div class="result-item">
                <span class="result-item__label">Медианы:</span><br>
                <span class="result-item__value">m<sub>a</sub> (к стороне BC) = ${formatNumber(medians.ma)}</span><br>
                <span class="result-item__value">m<sub>b</sub> (к стороне AC) = ${formatNumber(medians.mb)}</span><br>
                <span class="result-item__value">m<sub>c</sub> (к стороне AB) = ${formatNumber(medians.mc)}</span>
            </div>
        `;
    }

    document.getElementById('resultsContent').innerHTML = resultsHTML;
    document.getElementById('results').classList.add('results--visible');
}

document.addEventListener('DOMContentLoaded', function () {
    form = document.getElementById('calculatorForm');

    initializePage();
    
    document.getElementById('showBtn').addEventListener('click', showInputType);
    document.getElementById('calculateBtn').addEventListener('click', calculate);
    document.getElementById('clearBtn').addEventListener('click', clearInputs);

    inputErrorPairs.forEach(([inputId, errorId]) => {
        document.getElementById(inputId).addEventListener('focus', function () {
            hideInputError(inputId, errorId);
        });
    });
});