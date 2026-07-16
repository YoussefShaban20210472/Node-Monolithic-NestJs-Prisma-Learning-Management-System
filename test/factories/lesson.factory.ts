/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { faker } from '@faker-js/faker';
import {
  endDate,
  startDate,
} from '../invalid-values/domain/domain-invalid-date-values.js';

export function createRandomLesson(courseId: string = ''): {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  courseId?: string;
} {
  return {
    title: faker.string.alpha({ length: { min: 5, max: 255 } }),
    description: faker.string.alpha({ length: { min: 20, max: 1000 } }),
    startDate: startDate,
    endDate: endDate,
    courseId: courseId,
  };
}
