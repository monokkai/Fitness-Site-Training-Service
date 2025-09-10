import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { WorkoutService } from '../services/workout.service';

@Controller('workouts')
export class WorkoutController {
    constructor(private readonly workoutService: WorkoutService) { }

    @Get()
    async findAll() {
        return this.workoutService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const workout = await this.workoutService.findById(+id);
        if (!workout) {
            throw new NotFoundException('Workout not found');
        }
        return workout;
    }

    @Get('difficulty/:difficulty')
    async findByDifficulty(@Param('difficulty') difficulty: string) {
        return this.workoutService.findByDifficulty(difficulty);
    }
}
