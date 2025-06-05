let display = document.getElementById('display');
let lastOperationDisplay = document.getElementById('lastOperation');

// Cargar la última operación al iniciar
window.onload = function() {
    const lastOperation = localStorage.getItem('lastOperation');
    if (lastOperation) {
        lastOperationDisplay.textContent = lastOperation;
    }
    display.value = '';
};

function addToDisplay(value) {
    if (display.value === 'Error') {
        display.value = '';
    }
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLastChar() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const expression = display.value;
        // Reemplazar × por * para la evaluación
        const result = eval(expression.replace('×', '*'));

        // Guardar la operación en el almacenamiento local
        const operation = `${expression} = ${result}`;
        localStorage.setItem('lastOperation', operation);
        lastOperationDisplay.textContent = operation;

        // Mostrar el resultado
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Agregar soporte para teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Números y operadores
    if (/[\d+\-*/.%]/.test(key)) {
        addToDisplay(key);
    }
    // Enter o = para calcular
    else if (key === 'Enter' || key === '=') {
        calculate();
    }
    // Backspace para borrar último carácter
    else if (key === 'Backspace') {
        deleteLastChar();
    }
    // Escape para limpiar
    else if (key === 'Escape') {
        clearDisplay();
    }
});