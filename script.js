window.onload = () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const expressionDisplay = document.getElementById('expression');
    const resultDisplay = document.getElementById('result');
    const buttons = document.querySelectorAll('.buttons button');

    let expression = '';
    let result = '';
    let lastInput = '';

    // Theme toggle functionality
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark');
        const themeText = document.querySelector('.theme-text');
        themeText.textContent = themeToggle.checked ? "Switch to Light" : "Switch to Dark";
    });

    // Button click functionality
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'AC') {
                resetCalculator();
            } else if (value === 'DEL') {
                deleteLastCharacter();
            } else if (value === '=') {
                calculateResult();
            } else if (['+', '-', '*', '/'].includes(value)) {
                addOperator(value);
            } else if (value === '%') {
                addPercentage();
            } else {
                addValue(value);
            }

            updateDisplay();
        });
    });

    function resetCalculator() {
        expression = '';
        result = '';
        lastInput = '';
    }

    function deleteLastCharacter() {
        expression = expression.slice(0, -1);
        if (expression === '') {
            result = '';
        }
    }

    function calculateResult() {
        try {
            const formattedExpression = expression.replace(/(\d+)%/g, (match, num) => num / 100);
            result = eval(formattedExpression).toString();
        } catch (error) {
            result = 'Error';
        }
    }

    function addOperator(value) {
        if (!['+', '-', '*', '/'].includes(lastInput)) {
            expression += value;
        }
    }

    function addPercentage() {
        if (/\d$/.test(expression)) {
            expression += '%';
        }
    }

    function addValue(value) {
        expression += value;
    }

    function updateDisplay() {
        expressionDisplay.textContent = expression;
        resultDisplay.textContent = result;
        lastInput = expression.slice(-1);

        // Handle long display text
        if (expression.length > 10 || result.length > 10) {
            expressionDisplay.classList.add('long');
            resultDisplay.classList.add('long');
        } else {
            expressionDisplay.classList.remove('long');
            resultDisplay.classList.remove('long');
        }
    }
};
