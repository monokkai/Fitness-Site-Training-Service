import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Workouts')
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  difficulty: string;

  @Column({ nullable: true })
  image_url: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  repeats: number;

  @Column({ nullable: true })
  video_url: string;

  @Column({ nullable: true })
  category: string;

  // @Column({ name: 'xp_reward', default: 0 })
  // xp_reward: number;

  // @Column({ name: 'level_requirement', default: 1 })
  // level_requirement: number;

  // @Column({ name: 'exercise_order', default: 0 })
  // exercise_order: number;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
