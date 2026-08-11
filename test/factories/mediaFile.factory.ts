/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { generateRandomAlphanumericStrings } from '../generators/value.generator.js';

export function createRandomMediaFile() {
  return {
    file: `${generateRandomAlphanumericStrings(1, 100, 1, 1)[0]}.pdf`,
  };
}
