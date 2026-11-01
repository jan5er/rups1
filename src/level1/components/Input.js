//Treba narediti Heading, Input, simple text, combobox, container, image, button, card

import {forBlock} from './generator';
import {Order} from 'blockly/javascript';

//JSON for representing heading element for level 1
export const inputLevel1JSON = {
  "type": "input_level1",
  "tooltip": "Input",
  "helpUrl": "",
  "message0": "Label: %1 Variable to change: %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "LABEL_TEXT",
      "check": "String"
    },
    {
      "type": "field_variable",
      "name": "VAR_NAME",
      "variable": "item"
    },
    {
      "type": "input_dummy",
      "name": "VARIABLE_NAME_DUMMY"
    }
  ],
  "colour": 15
}

//Generator for heading element
export const initGenInput = () => {
    forBlock['input_level1'] = function (block, generator) {
    const labelText = generator.valueToCode(block, 'LABEL_TEXT', Order.ATOMIC);
    const varName = generator.getVariableName(block.getFieldValue('VAR_NAME'));
    
    const inputGenCode = generator.provideFunction_(
            'inputGenCode',
            `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(labelText, varName) {
                const outputDiv = document.getElementById('output');

                const labelEl = document.createElement('label');
                labelEl.for = "lepo_ime";
                labelEl.innerText = "Vrednost:"; //text
                outputDiv.appendChild(labelEl);

                const inputEl = document.createElement('input');
                inputEl.type = "text";
                inputEl.name = "lepo_ime";
                inputEl.value = "hgjhgjhj";
                inputEl.style.borderWidth = "1px";
                inputEl.style.borderStyle = "solid";
                outputDiv.appendChild(inputEl); 
                
                element.addEventListener("input", function(event) {
                    varName = event.target.value;
                });
        }`,
    );
    // Generate the function call for this block.
    const code = `${inputGenCode}(${labelText},${varName});\n`;
    return code;
    };
}

