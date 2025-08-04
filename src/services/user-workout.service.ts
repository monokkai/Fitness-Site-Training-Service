import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWorkout } from '../entities/user-workout.entity';
import { AssignWorkoutDto } from '../dto/assign-workout.dto';

@Injectable()
export class UserWorkoutService {
    constructor(
        @InjectRepository(UserWorkout)
        private userWorkoutRepository: Repository<UserWorkout>,
    ) { }

    async assignWorkout(assignWorkoutDto: AssignWorkoutDto): Promise<UserWorkout> {
        return this.userWorkoutRepository.save({
            userId: assignWorkoutDto.userId,
            workoutId: assignWorkoutDto.workoutId,
            completedAt: new Date()
        });
    }

    async getUserWorkouts(userId: number): Promise<UserWorkout[]> {
        return this.userWorkoutRepository.find({
            where: { userId },
            relations: ['workout']
        });
    }
}
