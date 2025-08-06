import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserWorkout } from './user-workout.entity';

@Entity('UserProfiles')
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userId: number;

    @Column({ nullable: true })
    age: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    weight: number;

    @Column({ nullable: true })
    height: number;

    @Column({ nullable: true })
    sex: string;

    @Column()
    trainingGoal: string;

    @Column({ default: 3 })
    workoutsPerWeek: number;

    @Column({ default: 0 })
    currentStreak: number;

    @Column({ default: 0 })
    longestStreak: number;

    @Column({ default: 0 })
    totalWorkouts: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => UserWorkout, workout => workout.userProfile)
    workouts: UserWorkout[];
}
