import { IsIn, IsInt, Min } from 'class-validator';
import { EnrollmentStatus } from '../../../../generated/prisma/enums.js';

export class UpdateEnrollmentDto {
  @IsInt()
  @Min(1)
  studentId!: number;

  @IsIn([EnrollmentStatus.ACCEPTED, EnrollmentStatus.REJECTED])
  status!: EnrollmentStatus;
}
