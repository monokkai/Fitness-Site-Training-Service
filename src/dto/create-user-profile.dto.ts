import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateUserProfileDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    @IsOptional()
    age?: number | null;

    @IsNumber()
    @IsOptional()
    weight?: number | null;

    @IsNumber()
    @IsOptional()
    height?: number | null;

    @IsString()
    @IsOptional()
    sex?: string | null;

    @IsString()
    trainingGoal: string;

    @IsNumber()
    @IsOptional()
    workoutsPerWeek?: number;

    @IsString()
    @IsOptional()
    goal?: string | null;
}
