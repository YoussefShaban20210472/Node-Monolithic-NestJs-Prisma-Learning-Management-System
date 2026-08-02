// import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';

export class CreateLessonInputDto {
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

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;
}
export class CreateLessonDto extends CreateLessonInputDto {
  @IsInt()
  @Min(1)
  instructorId!: number;

  @IsInt()
  @Min(1)
  courseId!: number;

  @IsString()
  @IsNotEmpty()
  @Length(20)
  @Matches(/^[0-9]{20}$/, {
    message: 'otp must contain only numbers',
  })
  otp!: string;
}
