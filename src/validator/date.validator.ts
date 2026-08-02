import { BadRequestException } from '@nestjs/common';

export const HALF_HOUR = 1000 * 60 * 30;
export const ONE_DAY = 1000 * 60 * 60 * 24;
export const SEVEN_DAYS = 7 * ONE_DAY;
export const ONE_YEAR = 365 * ONE_DAY;

export function assertDuration(
  startDate: string | Date,
  endDate: string | Date,
  type: 'minutes' | 'days',
) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  const diff = end - start;
  let message: string = '';
  if (!checkTimeBetweenTodayAndYear(startDate)) {
    message = 'startDate must be between today or at max one year from today';
  }
  if (type === 'minutes' && diff < HALF_HOUR) {
    message = 'endDate must be at least 30 minutes after startDate';
  }
  if (type === 'days' && diff < SEVEN_DAYS) {
    message = 'endDate must be at least 7 days after startDate';
  }

  if (diff > ONE_YEAR) {
    message = 'endDate must be at most 1 year after startDate';
  }

  if (message.length > 0) {
    throw new BadRequestException(message);
  }
}

export function checkTimeBetweenTodayAndYear(time: string | Date) {
  const date = new Date(time);
  const today = new Date();
  const oneYearFromNow = new Date(today.getTime() + ONE_YEAR);

  return date >= today && date <= oneYearFromNow;
}

export function assertValidTimeAndDuration(
  course: { startDate: string | Date; endDate: string | Date },
  object: { startDate: string | Date; endDate: string | Date },
  objectName: string,
) {
  const courseStartDate = new Date(course.startDate);
  const courseEndDate = new Date(course.endDate);
  const startDate = new Date(object.startDate);
  const endDate = new Date(object.endDate);

  assertDuration(object.startDate, object.endDate, 'minutes');

  let message: string = '';
  if (startDate < courseStartDate) {
    message = `${objectName} start date must start after course start date`;
  } else if (startDate >= courseEndDate) {
    message = `${objectName} start date must start before course end date`;
  } else if (endDate > courseEndDate) {
    message = `${objectName} end date must end before course end date`;
  }
  if (message.length > 0) {
    throw new BadRequestException(message);
  }
}
