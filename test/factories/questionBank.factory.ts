/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { faker } from '@faker-js/faker';

export function createRandomQuestionBank(
  type: string,
  courseId: string = '',
): {
  question: string;
  answer: string;
  score: number;
  type: string;
  choices: string[];
  courseId?: string;
} {
  const question = {
    question: faker.string.alpha({ length: { min: 10, max: 500 } }),
    answer: faker.string.alpha({ length: { min: 1, max: 255 } }),
    score: faker.number.int({ min: 0, max: 100 }),
    choices: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () =>
      faker.string.alpha({ length: { min: 1, max: 255 } }),
    ),
    type: type,
    courseId: courseId,
  };
  if (type !== 'MCQ') {
    question.choices = [];
  } else {
    question.choices[0] = question.answer;
  }
  return question;
}
