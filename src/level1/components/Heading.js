//Treba narediti Heading, Input, simple text, combobox, container, image, button, card

import {forBlock} from './generator';
import {Order} from 'blockly/javascript';

//JSON for representing heading element for level 1
export const headingLevel1JSON = {
  type: 'heading_level1',
  message0: 'Heading %1',
  args0: [
    {
      type: 'input_value',
      name: 'TEXT',
      check: 'String',
    },
  ],
  colour: 160,
  tooltip: 'Heading',
  helpUrl: '',
};

//Generator for heading element
export const initGenHeading = () => {

    forBlock['heading_level1'] = function (block, generator) {
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
    const headingGenCode = generator.provideFunction_(
            'headingGenCode',
            `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text) {

            const outputDiv = document.getElementById('output');
            const textEl = document.createElement('h1');
            textEl.innerText = text;
            outputDiv.appendChild(textEl);
        }`,
    );
    // Generate the function call for this block.
    const code = `${headingGenCode}(${text});\n`;
    return code;
    };
}

