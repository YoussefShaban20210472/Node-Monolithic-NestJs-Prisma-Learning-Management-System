import { IsInt, Min } from 'class-validator';

export class EnrollmentDto {
  @IsInt()
  @Min(1)
  studentId!: number;
}
