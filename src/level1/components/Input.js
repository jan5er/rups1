//Treba narediti Heading, Input, simple text, combobox, container, image, button, card

import {forBlock} from './generator';
import {Order} from 'blockly/javascript';

export const initInput = () => {
    forBlock['input_level1'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
    const addText = generator.provideFunction_(
            'addText',
            `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text) {
                const outputDiv = document.getElementById('output');

                const labelEl = document.createElement('label');
                labelEl.for = "lepo_ime";
                labelEl.innerText = "Vrednost:"; //text
                outputDiv.appendChild(labelEl);

                const inputEl = document.createElement('input');
                inputEl.type = "text";
                inputEl.name = "lepo_ime";
                inputEl.value = "hgjhgjhj";
                //inputEl.innerText = text;
                inputEl.style.borderWidth = "1px";
                inputEl.style.borderStyle = "solid";
                outputDiv.appendChild(inputEl);           

        }`,
    );
    // Generate the function call for this block.
    const code = `${addText}(${text});\n`;
    return code;
    };
}

