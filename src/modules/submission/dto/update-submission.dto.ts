import { IsInt, Max, Min } from 'class-validator';

export class UpdateSubmissionDto {
  @IsInt()
  @Min(1)
  @Max(100)
  score!: number;
}
