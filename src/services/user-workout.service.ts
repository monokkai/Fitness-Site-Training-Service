import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWorkout } from '../entities/user-workout.entity';
import { AssignWorkoutDto } from '../dto/assign-workout.dto';

@Injectable()
export class UserWorkoutService {
    constructor(
        @InjectRepository(UserWorkout)
        private readonly userWorkoutRepository: Repository<UserWorkout>,
    ) { }

    async assignWorkout(assignWorkoutDto: AssignWorkoutDto): Promise<UserWorkout> {
        const userWorkout = this.userWorkoutRepository.create({
            userProfile: { userId: assignWorkoutDto.userId },
            workout: { id: assignWorkoutDto.workoutId },
            completedAt: new Date()
        });
        return this.userWorkoutRepository.save(userWorkout);
    }

    async getUserWorkouts(userId: number): Promise<UserWorkout[]> {
        return this.userWorkoutRepository.find({
            where: { userProfile: { userId } },
            relations: ['workout']
        });
    }
}
