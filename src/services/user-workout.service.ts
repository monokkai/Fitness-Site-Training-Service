import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWorkout } from '../entities/user-workout.entity';

@Injectable()
export class UserWorkoutService {
  constructor(
    @InjectRepository(UserWorkout)
    private readonly userWorkoutRepository: Repository<UserWorkout>,
  ) { }

  async createUserWorkout(userId: number, workoutId: number, completionData: {
    completionTime: number;
    actualRepeats: number;
    score: number;
  }): Promise<UserWorkout> {
    const userWorkout = this.userWorkoutRepository.create({
      user_id: userId,
      workout_id: workoutId,
      completed: true,
      completion_time: completionData.completionTime,
      actual_repeats: completionData.actualRepeats,
      score: completionData.score,
      completed_at: new Date(),
    });
    return this.userWorkoutRepository.save(userWorkout);
  }

  async getUserWorkouts(userId: number): Promise<UserWorkout[]> {
    return this.userWorkoutRepository.find({
      where: { user_id: userId },
    });
  }
}
