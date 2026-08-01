// import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';

export class CreateCourseByInstructorDto {
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

  @IsString()
  @IsNotEmpty()
  @Length(20, 500)
  @Matches(/^[a-zA-Z]{20,500}$/, {
    message: 'shortDescription must contain only letters',
  })
  shortDescription!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ArrayUnique()
  @IsString({ each: true })
  @Length(1, 255, { each: true })
  @Matches(/^[a-zA-Z]{1,255}$/, {
    message: 'tag element must contain only letters',
    each: true,
  })
  tags!: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ArrayUnique()
  @IsString({ each: true })
  @Length(1, 255, { each: true })
  @Matches(/^[a-zA-Z]{1,255}$/, {
    message: 'category element must contain only letters',
    each: true,
  })
  categories!: string[];
}
export class CreateCourseDto extends CreateCourseByInstructorDto {
  @IsInt()
  @Min(1)
  instructorId!: number;
}
