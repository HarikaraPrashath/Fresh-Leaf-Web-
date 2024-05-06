import React, { useState } from 'react';React;
import { Link } from 'react-router-dom';


const Calculator = () => {
    const [display, setDisplay] = useState('');
    const [currentNumber, setCurrentNumber] = useState('');
    const [previousNumber, setPreviousNumber] = useState('');
    const [operator, setOperator] = useState('');

    const handleNumberClick = (value) => {
        setCurrentNumber(currentNumber + value);
        setDisplay(display + value);
    };

    const handleOperatorClick = (value) => {
        if (currentNumber !== '') {
            if (previousNumber !== '') {
                handleEqual();
            }
            setPreviousNumber(currentNumber);
            setCurrentNumber('');
            setOperator(value);
            setDisplay(display + ' ' + value + ' ');
        }
    };

    const handleEqual = () => {
        if (previousNumber !== '' && currentNumber !== '') {
            let result;
            switch (operator) {
                case '+':
                    result = parseFloat(previousNumber) + parseFloat(currentNumber);
                    break;
                case '-':
                    result = parseFloat(previousNumber) - parseFloat(currentNumber);
                    break;
                case '*':
                    result = parseFloat(previousNumber) * parseFloat(currentNumber);
                    break;
                case '/':
                    result = parseFloat(previousNumber) / parseFloat(currentNumber);
                    break;
                default:
                    return;
            }
            setDisplay(result.toString());
            setCurrentNumber(result.toString());
            setPreviousNumber('');
            setOperator('');
        }
    };

    const handleClear = () => {
        setDisplay('');
        setCurrentNumber('');
        setPreviousNumber('');
        setOperator('');
    };


    return (
        <div className="display: flex;
        flex-direction: column;
        align-items: center">
            <div className="w-full h-16 mb-4 text-3xl font-bold text-right p-2 bg-white border border-gray-300 rounded-md">{display || '0'}</div>
            <div className="grid grid-cols-4 gap-4">
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleNumberClick('1')}>1</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleNumberClick('2')}>2</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleNumberClick('3')}>3</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleOperatorClick('+')}>+</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleNumberClick('4')}>4</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleNumberClick('5')}>5</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleNumberClick('6')}>6</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleOperatorClick('*')}>*</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleNumberClick('7')}>7</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleNumberClick('8')}>8</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleNumberClick('9')}>9</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleOperatorClick('-')}>-</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none col-span-2" onClick={() => handleNumberClick('0')}>0</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleNumberClick('.')}>.</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={handleEqual}>=</button>
                <button className="w-full h-20 text-xl border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none" onClick={() => handleOperatorClick('/')}>/</button>
            </div>
            <button className="w-48 h-12 text-xl rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 focus:outline-none" onClick={handleClear}>Clear</button>
            <div className='mb-2 font-serif'></div>
            <div className='mb-2 font-serif'></div>
            <div className='flex flex-row p-3 justify-between font-serif'>
                <Link to='/productdetails' className='rounded-md p-2 m-5 cursor-pointer hover:scale-[1.1] bg-green-950
    w-[150px] h-8 text-center
    text-white ml-4'>Back</Link>
            </div>
        </div>
    );
};

export default Calculator;

