// import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  @Matches(/^[a-zA-Z]{5,255}$/, {
    message: 'title must contain only letters',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(20, 9999999)
  @Matches(/^[a-zA-Z]{20,9999999}$/, {
    message: 'description must contain only letters',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(20, 500)
  @Matches(/^[a-zA-Z]{20,500}$/, {
    message: 'shortDescription must contain only letters',
  })
  shortDescription?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
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
  tags?: string[];

  @IsOptional()
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
  categories?: string[];
}
