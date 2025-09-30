import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('Levels')
export class Level {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'level_number' })
    level_number: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ name: 'required_xp' })
    required_xp: number;

    @Column('int', { array: true, name: 'workout_ids' })
    workout_ids: number[];

    @Column({ name: 'is_locked', default: true })
    is_locked: boolean;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;
}