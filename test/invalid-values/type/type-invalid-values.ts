import {
  booleanValues,
  numberValues,
  objectArrayValues,
  objectValues,
  stringArrayValues,
  stringValues,
} from '../../values/values.js';

const typeValues = {
  String: stringValues,
  Number: numberValues,
  Boolean: booleanValues,
  StringArray: stringArrayValues,
  Object: objectValues,
  ObjectArray: objectArrayValues,
};

export const typeInvalidValues = {
  String: [
    ...typeValues.Boolean,
    ...typeValues.Object,
    ...typeValues.Number,
    ...typeValues.StringArray,
  ],
  Number: [
    ...typeValues.Boolean,
    ...typeValues.Object,
    ...typeValues.String,
    ...typeValues.StringArray,
  ],
  Boolean: [
    ...typeValues.String,
    ...typeValues.Object,
    ...typeValues.Number,
    ...typeValues.StringArray,
  ],
  StringArray: [
    ...typeValues.Boolean,
    ...typeValues.Object,
    ...typeValues.Number,
    // ...typeValues.String,
  ],
  Object: [
    ...typeValues.Boolean,
    ...typeValues.StringArray,
    ...typeValues.Number,
    ...typeValues.String,
  ],
  ObjectArray: [
    ...typeValues.Boolean,
    ...typeValues.Object,
    ...typeValues.Number,
    ...typeValues.String,
    ...typeValues.StringArray,
    ...typeValues.ObjectArray,
  ],
};
