import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Matches(/^[a-zA-Z]{3,20}$/, {
    message: 'firstName must contain only letters',
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Matches(/^[a-zA-Z]{3,20}$/, {
    message: 'lastName must contain only letters',
  })
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(1000)
  @Matches(/^\d{1,5}\s\w.\s(\b\w+\b\s){1,2}\w*\.$/)
  address?: string;
}
