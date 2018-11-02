import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parts: [],
            lastInput: undefined,
            lastNumber: '0',
        };
        this.updateCalculator = this.updateCalculator.bind(this);
    }

    updateCalculator(event) {
        const param = event.target.innerHTML.toString(); 
        let evaluation = '';
        let parts = this.state.parts;
        let lastInput = this.state.lastInput;
        let lastNumber = this.state.lastNumber;
        switch(param) {
            case '=':
                try {
                    evaluation = eval(parts.toString().replace(/,/g, ' '));
                } catch {
                    this.setState({
                        parts: ['error'],
                        lastInput: undefined,
                        lastNumber: '0',
                    });
                }
                if(evaluation !== undefined){
                    this.setState({
                        parts: [evaluation.toString()],
                        lastInput: undefined,
                        lastNumber: evaluation.toString(),
                    });
                }
                break;
            case 'AC':
                this.setState({
                    parts: [],
                    lastInput: undefined,
                    lastNumber: '0',
                });
                break;
            case '.':
                if(lastNumber.indexOf('.') === -1){
                    lastNumber += param;
                    if(lastNumber === '0.'){
                        parts.push(lastNumber);
                    }else {
                        parts[parts.length -1] = lastNumber;
                    }
                    this.setState({
                        parts: parts,
                        lastInput: param,
                        lastNumber: lastNumber,
                    });
                }
                break;
            case '*':
            case '/':
            case '+':
            case '-':
                switch(lastInput) {
                    case '*':
                    case '/':
                    case '+':
                    case '-':
                        //replace last operator with current operator
                        parts[parts.length -1] = param;
                        break;
                    default:
                        //add number to parts array.
                        parts.push(param);
                        lastNumber = '0';
                        break;
                }

                this.setState({
                    parts: parts,
                    lastInput: param,
                    lastNumber: lastNumber,
                });
                break;
            default:
                //param is a number
                if(this.state.lastNumber === '0'){
                    lastNumber = param;
                    if(lastNumber !== '0'){
                        parts.push(lastNumber);
                    }
                }else{
                    lastNumber += param;
                    parts[parts.length -1] = lastNumber;
                }
                this.setState({
                    parts: parts,
                    lastInput: param,
                    lastNumber: lastNumber,
                });
                break;
        }
    }

    addButtons(){
        const elements = [
            {value: 'AC', name: 'clear'},
            {value: '*', name: 'multiply'},
            {value: '/', name: 'divide'},
            {value: '7', name: 'seven'},
            {value: '8', name: 'eight'},
            {value: '9', name: 'nine'},
            {value: '-', name: 'subtract'},
            {value: '4', name: 'four'},
            {value: '5', name: 'five'},
            {value: '6', name: 'six'},
            {value: '+', name: 'add'},
            {value: '1', name: 'one'},
            {value: '2', name: 'two'},
            {value: '3', name: 'three'},
            {value: '0', name: 'zero'},
            {value: '.', name: 'decimal'},
            {value: '=', name: 'equals'},
        ];
        let buttons = [];
        buttons = elements.map((x) => 
            <div key={'button_' + x.name} id={x.name} className="calcButton" onClick={this.updateCalculator}>{x.value}</div>
        );
        return buttons;
    }

    

    render() {
        return(
            <div id="app-wrapper">
                <div id="display">
                    {this.state.parts.length > 0 ? this.state.parts.toString().replace(/,/g, ' ') : '0'}
                </div>
                <div id="button-container">
                    {this.addButtons()}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));