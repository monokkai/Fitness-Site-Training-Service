import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { Workout } from './workout.entity';

@Entity('UserWorkouts')
export class UserWorkout {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', nullable: true })
    completedAt: Date;

    @ManyToOne(() => UserProfile, userProfile => userProfile.workouts)
    @JoinColumn({ name: 'userId' })
    userProfile: UserProfile;

    @ManyToOne(() => Workout)
    @JoinColumn({ name: 'workoutId' })
    workout: Workout;
}
