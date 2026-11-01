//Treba narediti Heading, Input, simple text, combobox, container, image, button, card

import {forBlock} from './generator';
import {Order} from 'blockly/javascript';

export const initHeading = () => {
    forBlock['heading_level1'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
    const addText = generator.provideFunction_(
            'addText',
            `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text) {

            const outputDiv = document.getElementById('output');
            const textEl = document.createElement('h1');
            textEl.innerText = text;
            outputDiv.appendChild(textEl);
        }`,
    );
    // Generate the function call for this block.
    const code = `${addText}(${text});\n`;
    return code;
    };
}

