import { headingLevel1JSON, initGenHeading } from "./Heading";
import * as Blockly from 'blockly/core';

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
    headingLevel1JSON,
]);

//Object that saves generetors for blocks
export const forBlock = Object.create(null);

//Set generators for blocks
initGenHeading();

