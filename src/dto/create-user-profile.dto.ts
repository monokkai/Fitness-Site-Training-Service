import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateUserProfileDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    @IsOptional()
    age?: number;

    @IsNumber()
    @IsOptional()
    weight?: number;

    @IsNumber()
    @IsOptional()
    height?: number;

    @IsString()
    @IsOptional()
    sex?: string;

    @IsString()
    trainingGoal: string;

    @IsNumber()
    @IsOptional()
    workoutsPerWeek?: number;

    @IsString()
    @IsOptional()
    goal?: string;
}
