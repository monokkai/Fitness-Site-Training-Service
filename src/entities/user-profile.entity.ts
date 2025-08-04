import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

    @OneToMany(() => UserWorkout, workout => workout.userProfile)
    workouts: UserWorkout[];
}
