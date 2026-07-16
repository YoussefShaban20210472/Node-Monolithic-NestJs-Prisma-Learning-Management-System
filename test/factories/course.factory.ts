/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { faker } from '@faker-js/faker';
import {
  courseEndDate,
  courseStartDate,
} from '../invalid-values/domain/domain-invalid-date-values.js';

export function createRandomCourse() {
  return {
    title: faker.string.alpha({ length: { min: 5, max: 255 } }),
    shortDescription: faker.string.alpha({ length: { min: 20, max: 500 } }),
    description: faker.string.alpha({ length: { min: 20, max: 1000 } }),
    startDate: courseStartDate,
    endDate: courseEndDate,
    tags: Array.from({ length: faker.number.int({ min: 1, max: 100 }) }, () =>
      faker.string.alpha({ length: { min: 5, max: 10 } }),
    ),
    categories: Array.from(
      { length: faker.number.int({ min: 1, max: 100 }) },
      () => faker.string.alpha({ length: { min: 5, max: 10 } }),
    ),
  };
}
