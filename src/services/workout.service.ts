import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from '../entities/workout.entity';

@Injectable()
export class WorkoutService {
    constructor(
        @InjectRepository(Workout)
        private workoutRepository: Repository<Workout>,
    ) { }

    async findByType(type: string): Promise<Workout[]> {
        return this.workoutRepository.find({ where: { type } });
    }
}
