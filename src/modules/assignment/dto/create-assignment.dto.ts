// import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateAssignmentInputDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  @Matches(/^[a-zA-Z]{5,255}$/, {
    message: 'title must contain only letters',
  })
  title!: string;

  @IsString()
  @IsNotEmpty()
  @Length(20, 9999999)
  @Matches(/^[a-zA-Z]{20,9999999}$/, {
    message: 'description must contain only letters',
  })
  description!: string;

  @IsInt()
  @Min(1)
  @Max(100)
  score!: number;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;
}
export class CreateAssignmentDto extends CreateAssignmentInputDto {
  @IsInt()
  @Min(1)
  instructorId!: number;

  @IsInt()
  @Min(1)
  courseId!: number;
}
