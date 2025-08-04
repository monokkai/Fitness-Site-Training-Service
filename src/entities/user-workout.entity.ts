import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { Workout } from './workout.entity';

@Entity('UserWorkouts')
export class UserWorkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @ManyToOne(() => UserProfile, userProfile => userProfile.workouts)
  userProfile: UserProfile;

  @ManyToOne(() => Workout)
  workout: Workout;
}
