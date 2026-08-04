import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';

export class CreateAttendanceInputDto {
  @IsString()
  @IsNotEmpty()
  @Length(20)
  @Matches(/^[0-9]{20}$/, {
    message: 'otp must contain only numbers',
  })
  otp!: string;
}
export class CreateAttendanceDto extends CreateAttendanceInputDto {
  @IsInt()
  @Min(1)
  studentId!: number;
}
