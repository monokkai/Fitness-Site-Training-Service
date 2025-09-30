import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Level } from '../entities/level.entity';
import { Workout } from '../entities/workout.entity';

@Injectable()
export class LevelService {
    constructor(
        @InjectRepository(Level)
        private levelRepository: Repository<Level>,
        @InjectRepository(Workout)
        private workoutRepository: Repository<Workout>,
    ) {}

    async getLevelWithWorkouts(levelId: number) {
        const level = await this.levelRepository.findOne({
            where: { level_number: levelId }
        });

        if (!level) {
            throw new Error('Level not found');
        }

        const workouts = await this.workoutRepository.find({
            where: { id: In(level.workout_ids) }
        });

        return {
            id: level.level_number,
            title: level.title,
            description: level.description,
            required_xp: level.required_xp,
            workouts: workouts.map(w => ({
                id: w.id,
                title: w.title,
                description: w.description,
                duration: w.duration,
                difficulty: w.difficulty,
                category: w.category,
            }))
        };
    }

    async getAllLevels() {
        return this.levelRepository.find({
            order: { level_number: 'ASC' }
        });
    }
}