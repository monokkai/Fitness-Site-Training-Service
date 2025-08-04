import { Controller, Get, Param } from '@nestjs/common';
import { WorkoutService } from '../services/workout.service';

@Controller('workouts')
export class WorkoutController {
    constructor(private readonly workoutService: WorkoutService) { }

    @Get(':type')
    async findByType(@Param('type') type: string) {
        return this.workoutService.findByType(type);
    }
}
