
 class Calculator {
            constructor(previousOperandElement, currentOperandElement, historyElement) {
                this.previousOperandElement = previousOperandElement;
                this.currentOperandElement = currentOperandElement;
                this.historyElement = historyElement;
                this.clear();
                this.updateDisplay();
            }
            
            clear() {
                this.currentOperand = '0';
                this.previousOperand = '';
                this.operation = undefined;
                this.history = [];
            }
            
            delete() {
                this.currentOperand = this.currentOperand.toString().slice(0, -1);
                if (this.currentOperand === '') {
                    this.currentOperand = '0';
                }
            }
            
            appendNumber(number) {
                if (number === '.' && this.currentOperand.includes('.')) return;
                if (this.currentOperand === '0' && number !== '.') {
                    this.currentOperand = number.toString();
                } else {
                    this.currentOperand = this.currentOperand.toString() + number.toString();
                }
            }
            
            chooseOperation(operation) {
                if (this.currentOperand === '') return;
                if (this.previousOperand !== '') {
                    this.compute();
                }
                this.operation = operation;
                this.previousOperand = this.currentOperand;
                this.currentOperand = '';
            }
            
            compute() {
                let computation;
                const prev = parseFloat(this.previousOperand);
                const current = parseFloat(this.currentOperand);
                if (isNaN(prev) || isNaN(current)) return;
                
                switch (this.operation) {
                    case '+':
                        computation = prev + current;
                        break;
                    case '-':
                        computation = prev - current;
                        break;
                    case '*':
                        computation = prev * current;
                        break;
                    case '÷':
                        computation = prev / current;
                        break;
                    case '^':
                        computation = Math.pow(prev, current);
                        break;
                    default:
                        return;
                }
                
                // Add to history
                this.history.push(`${this.previousOperand} ${this.operation} ${this.currentOperand} = ${computation}`);
                if (this.history.length > 5) {
                    this.history.shift();
                }
                
                this.currentOperand = computation.toString();
                this.operation = undefined;
                this.previousOperand = '';
            }
            
            scientificCompute(func) {
                const current = parseFloat(this.currentOperand);
                if (isNaN(current)) return;
                
                let result;
                switch (func) {
                    case 'sin':
                        result = Math.sin(current * Math.PI / 180);
                        break;
                    case 'cos':
                        result = Math.cos(current * Math.PI / 180);
                        break;
                    case 'tan':
                        result = Math.tan(current * Math.PI / 180);
                        break;
                    case 'sqrt':
                        result = Math.sqrt(current);
                        break;
                    case 'log':
                        result = Math.log10(current);
                        break;
                    case 'ln':
                        result = Math.log(current);
                        break;
                    case 'pow2':
                        result = Math.pow(current, 2);
                        break;
                    case 'pow3':
                        result = Math.pow(current, 3);
                        break;
                    case 'reciprocal':
                        result = 1 / current;
                        break;
                    case 'abs':
                        result = Math.abs(current);
                        break;
                    case 'pi':
                        result = Math.PI;
                        break;
                    case 'e':
                        result = Math.E;
                        break;
                    default:
                        return;
                }
                
                // Add to history
                this.history.push(`${func}(${current}) = ${result}`);
                if (this.history.length > 5) {
                    this.history.shift();
                }
                
                this.currentOperand = result.toString();
                this.previousOperand = '';
                this.operation = undefined;
            }
            
            formatDisplayNumber(number) {
                const stringNumber = number.toString();
                const integerDigits = parseFloat(stringNumber.split('.')[0]);
                const decimalDigits = stringNumber.split('.')[1];
                let integerDisplay;
                
                if (isNaN(integerDigits)) {
                    integerDisplay = '';
                } else {
                    integerDisplay = integerDigits.toLocaleString('en', {
                        maximumFractionDigits: 10
                    });
                }
                
                if (decimalDigits != null) {
                    return `${integerDisplay}.${decimalDigits}`;
                } else {
                    return integerDisplay;
                }
            }
            
            updateDisplay() {
                this.currentOperandElement.innerText = this.formatDisplayNumber(this.currentOperand);
                
                if (this.operation != null) {
                    this.previousOperandElement.innerText = 
                        `${this.formatDisplayNumber(this.previousOperand)} ${this.operation}`;
                } else {
                    this.previousOperandElement.innerText = '';
                }
                
                // Update history
                this.historyElement.innerHTML = this.history.join('<br>');
            }
        }
        
        // Create calculator
        const previousOperandElement = document.getElementById('previous-operand');
        const currentOperandElement = document.getElementById('current-operand');
        const historyElement = document.getElementById('history');
        const calculator = new Calculator(previousOperandElement, currentOperandElement, historyElement);
        
        // Create buttons
        const buttonsContainer = document.getElementById('calculator-buttons');
        
        const basicButtons = [
            { label: 'C', class: 'clear-btn', action: 'clear' },
            { label: 'DEL', class: 'clear-btn', action: 'delete' },
            { label: '√', class: 'function-btn', action: 'sqrt' },
            { label: '^', class: 'function-btn', action: '^' },
            { label: 'π', class: 'function-btn', action: 'pi' },
            
            { label: 'sin', class: 'function-btn', action: 'sin' },
            { label: '7', class: 'number-btn', action: '7' },
            { label: '8', class: 'number-btn', action: '8' },
            { label: '9', class: 'number-btn', action: '9' },
            { label: '÷', class: 'operator-btn', action: '÷' },
            
            { label: 'cos', class: 'function-btn', action: 'cos' },
            { label: '4', class: 'number-btn', action: '4' },
            { label: '5', class: 'number-btn', action: '5' },
            { label: '6', class: 'number-btn', action: '6' },
            { label: '*', class: 'operator-btn', action: '*' },
            
            { label: 'tan', class: 'function-btn', action: 'tan' },
            { label: '1', class: 'number-btn', action: '1' },
            { label: '2', class: 'number-btn', action: '2' },
            { label: '3', class: 'number-btn', action: '3' },
            { label: '-', class: 'operator-btn', action: '-' },
            
            { label: 'x²', class: 'function-btn', action: 'pow2' },
            { label: '0', class: 'number-btn', action: '0' },
            { label: '.', class: 'number-btn', action: '.' },
            { label: '=', class: 'equals-btn', action: '=' },
            { label: '+', class: 'operator-btn', action: '+' },
            
            { label: 'x³', class: 'function-btn', action: 'pow3' },
            { label: 'e', class: 'function-btn', action: 'e' },
            { label: 'log', class: 'function-btn', action: 'log' },
            { label: 'ln', class: 'function-btn', action: 'ln' },
            { label: '|x|', class: 'function-btn', action: 'abs' }
        ];
        
        basicButtons.forEach(button => {
            const btnElement = document.createElement('button');
            btnElement.classList.add('btn');
            btnElement.classList.add(button.class);
            btnElement.innerText = button.label;
            
            btnElement.addEventListener('click', () => {
                switch (button.action) {
                    case 'clear':
                        calculator.clear();
                        break;
                    case 'delete':
                        calculator.delete();
                        break;
                    case '=':
                        calculator.compute();
                        break;
                    case '+':
                    case '-':
                    case '*':
                    case '÷':
                    case '^':
                        calculator.chooseOperation(button.action);
                        break;
                    case 'sin':
                    case 'cos':
                    case 'tan':
                    case 'sqrt':
                    case 'log':
                    case 'ln':
                    case 'pow2':
                    case 'pow3':
                    case 'abs':
                    case 'pi':
                    case 'e':
                        calculator.scientificCompute(button.action);
                        break;
                    default:
                        calculator.appendNumber(button.action);
                        break;
                }
                calculator.updateDisplay();
            });
            
            buttonsContainer.appendChild(btnElement);
        });
