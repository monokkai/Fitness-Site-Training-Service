import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserWorkoutService } from '../services/user-workout.service';

@Controller('user-workouts')
export class UserWorkoutController {
    constructor(private readonly userWorkoutService: UserWorkoutService) { }

    @Post()
    async createUserWorkout(
        @Body() body: { userId: number; workoutId: number; completionTime: number; actualRepeats: number; score: number }
    ) {
        return this.userWorkoutService.createUserWorkout(
            body.userId,
            body.workoutId,
            {
                completionTime: body.completionTime,
                actualRepeats: body.actualRepeats,
                score: body.score,
            }
        );
    }

    @Get(':userId')
    async getUserWorkouts(@Param('userId') userId: string) {
        return this.userWorkoutService.getUserWorkouts(+userId);
    }
}
