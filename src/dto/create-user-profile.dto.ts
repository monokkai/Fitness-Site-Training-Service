export class CreateUserProfileDto {
    userId: number;
    age?: number;
    weight?: number;
    height?: number;
    sex?: string;
    trainingGoal: string;
}
