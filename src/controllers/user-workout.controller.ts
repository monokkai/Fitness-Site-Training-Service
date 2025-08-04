import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserWorkoutService } from '../services/user-workout.service';
import { AssignWorkoutDto } from '../dto/assign-workout.dto';

@Controller('user-workouts')
export class UserWorkoutController {
    constructor(private readonly userWorkoutService: UserWorkoutService) { }

    @Post()
    async assignWorkout(@Body() assignWorkoutDto: AssignWorkoutDto) {
        return this.userWorkoutService.assignWorkout(assignWorkoutDto);
    }

    @Get(':userId')
    async getUserWorkouts(@Param('userId') userId: string) {
        return this.userWorkoutService.getUserWorkouts(+userId);
    }
}
