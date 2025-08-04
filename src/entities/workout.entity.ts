import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Workouts')
export class Workout {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column()
    type: string;

    @Column()
    durationMinutes: number;

    @Column()
    difficulty: string;
}
