import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from '../entities/workout.entity';
import { UserProfile } from '../entities/user-profile.entity';

@Injectable()
export class WorkoutService {
    constructor(
        @InjectRepository(Workout)
        private workoutRepository: Repository<Workout>,

        @InjectRepository(UserProfile)
        private userProfileRepository: Repository<UserProfile>,
    ) { }

    async findAll(): Promise<Workout[]> {
        return this.workoutRepository.find();
    }

    async findById(id: number): Promise<Workout | null> {
        return this.workoutRepository.findOne({ where: { id } });
    }

    async findByDifficulty(difficulty: string): Promise<Workout[]> {
        return this.workoutRepository.find({ where: { difficulty } });
    }

    async getWorkoutsByLevel(level: number): Promise<Workout[]> {
        return this.workoutRepository.find({
            where: { level_requirement: level },
            order: { exercise_order: 'ASC' }
        });
    }

    async getNextLevelWorkouts(userId: number): Promise<Workout[]> {
        const userProfile = await this.userProfileRepository.findOne({
            where: { userId },
        });

        if (!userProfile) {
            throw new NotFoundException('User profile not found');
        }

        return this.getWorkoutsByLevel(userProfile.currentLevel);
    }
}
