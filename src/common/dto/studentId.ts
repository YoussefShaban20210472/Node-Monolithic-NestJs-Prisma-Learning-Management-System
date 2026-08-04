import { IsInt, Min } from 'class-validator';

export class StudentIdDto {
  @IsInt()
  @Min(1)
  studentId!: number;
}
