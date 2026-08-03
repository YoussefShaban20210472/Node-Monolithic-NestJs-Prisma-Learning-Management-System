import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class UpdateAssignmentDto {
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
  @IsInt()
  @Min(1)
  @Max(100)
  score!: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
