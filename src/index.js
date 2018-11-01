import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parts: [],
            currentInput: undefined, 
            input: '0',
            output: '0',
        };
        this.updateCalculator = this.updateCalculator.bind(this);
    }

    updateCalculator(event) {
        const param = event.target.innerHTML.toString(); 
        let evaluation = '';
        let parts = [];
        let currentInput = this.state.currentInput;
        let input = this.state.input;
        let output = this.state.output;
        switch(param) {
            case '=':
                evaluation = eval(this.state.input);
                this.setState({
                    parts: [evaluation],
                    currentInput: undefined,
                    input: evaluation,
                    output: evaluation,
                });
                break;
            case 'AC':
                this.setState({
                    parts: [],
                    currentInput: undefined,
                    input: '0',
                    output: '0',
                });
                break;
            case '.':
                if(this.state.input.indexOf('.') === -1){
                    this.setState({
                        input: this.state.input + param,
                    });
                }
                break;
            case '*':
            case '/':
            case '+':
            case '-':
                if(currentInput !== undefined){
                    switch(input[input.length]) {
                        case '*':
                        case '/':
                        case '+':
                        case '-':
                            input = input.splice(input.length, 1, param);
                            parts[parts.length] = param;
                            break;
                        default:
                            parts = parts.concat(currentInput);
                            parts = parts.concat(param);
                            break;
                    }
                    
                    this.setState({
                        parts: parts,
                        input: input,
                    });
                }
                this.setState({
                    parts: this.state.parts.concat(),
                    input: this.state.input + param,
                });
                break;
            default:
                const newInput = this.state.input === '0' ? param : this.state.input + param;
                
                evaluation = eval(newInput);
                this.setState({
                    input: newInput,
                    output: evaluation,
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
                    <span id="input">{this.state.input}</span>
                    <span id="output">{this.state.output}</span>
                </div>
                <div id="button-container">
                    {this.addButtons()}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));