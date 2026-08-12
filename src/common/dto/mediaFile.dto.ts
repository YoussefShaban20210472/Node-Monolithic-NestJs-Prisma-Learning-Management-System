import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class MediaFileDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  @Matches(/^[0-9a-zA-Z]+\.pdf$/, {
    message: 'file must contain only letters and numbers',
  })
  file!: string;
}
