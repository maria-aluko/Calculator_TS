import { useState } from 'react';
import './Calculator.css';

const Calculator: React.FC = () => {
  const [currentValue, setCurrentValue] = useState<string>('');
  const [previousValue, setPreviousValue] = useState<string>('');
  const [operation, setOperation] = useState<string>('');
  const [fullCalc, setFullCalc] = useState<string>('');

  const purrAudio = new Audio('/meow.mp3');

  const playMeow = () => {
    purrAudio.play();
  };

  const formatDecimals = (value: string) => {
    if (!value) return '';
    const [integer, decimal] = value.split('.');
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
  };

  const getDisplayText = () => {
    if (fullCalc) {
      return fullCalc;
    }
    if (previousValue && operation && currentValue) {
      return `${formatDecimals(previousValue)} ${operation} ${formatDecimals(currentValue)}`;
    }
    if (previousValue && operation) {
      return `${formatDecimals(previousValue)} ${operation}`;
    }
    return formatDecimals(currentValue);
  };

  const handleButtonClick = (value: string) => {
    setCurrentValue(prevValue => prevValue + value);
  };

  const setOperationHandler = (value: string) => {
    if (currentValue === '') return;
    setPreviousValue(currentValue);
    setCurrentValue('');
    setOperation(value);
  };

  const clearDisplay = (): void => {
    setCurrentValue('');
    setPreviousValue('');
    setOperation('');
    setFullCalc('');
  };

  const calculateResult = () => {
    if (currentValue === '' || previousValue === '' || operation === '') return;

    let result: number;
    const prev = parseFloat(previousValue.replace(/,/g, ''));
    const current = parseFloat(currentValue.replace(/,/g, ''));

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          alert("Cannot divide by zero");
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    const resultString = result.toString();
    setFullCalc(`${formatDecimals(previousValue)} ${operation} ${formatDecimals(currentValue)} = ${formatDecimals(resultString)}`);
    setCurrentValue(resultString);
    setPreviousValue('');
    setOperation('');
  };

  const handleDecimalClick = () => {
    if (!currentValue.includes('.')) {
      setCurrentValue((prevValue) => prevValue + '.');
    }
  };
  
  return (
    <div className="calculator">
      <div className='column'>
        <input className='subtle' type="text" value={getDisplayText()} readOnly />
        <input type="text" value={currentValue} readOnly />
      </div>
      <div className='column'>
        <button className='clear' onClick={clearDisplay}>C</button>
        <button className='op' onClick={() => setOperationHandler('/')}>/</button>
        <button className='op' onClick={() => setOperationHandler('*')}>*</button>
      </div>
      <div className='column'>
        <button className='num' onClick={() => handleButtonClick('7')}>7</button>
        <button className='num' onClick={() => handleButtonClick('8')}>8</button>
        <button className='num' onClick={() => handleButtonClick('9')}>9</button>
        <button className='op' onClick={() => setOperationHandler('-')}>-</button>
      </div>
      <div className='column'>
        <button className='num' onClick={() => handleButtonClick('4')}>4</button>
        <button className='num' onClick={() => handleButtonClick('5')}>5</button>
        <button className='num' onClick={() => handleButtonClick('6')}>6</button>
        <button className='op' onClick={() => setOperationHandler('+')}>+</button>
      </div>
      <div className='column'>
        <button className='num' onClick={() => handleButtonClick('1')}>1</button>
        <button className='num' onClick={() => handleButtonClick('2')}>2</button>
        <button className='num' onClick={() => handleButtonClick('3')}>3</button>
        <button className="decimal" onClick={handleDecimalClick}>.</button>
      </div>
      <div className='column'>
        <button className='num cat' onClick={playMeow}>?</button>
        <button className='num' onClick={() => handleButtonClick('0')}>0</button>
        <button className='result' onClick={calculateResult}>=</button>
      </div>
    </div>
  );
};

export default Calculator;