import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Entity('UserLevelProgress')
export class UserLevelProgress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    user_id: number;

    @ManyToOne(() => UserProfile, userProfile => userProfile.levelProgress)
    @JoinColumn({ name: 'user_id' })
    userProfile: UserProfile;

    @Column()
    level: number;

    @Column({ default: false })
    completed: boolean;

    @Column({ name: 'completion_time', nullable: true })
    completion_time: number;

    @Column({ default: 0 })
    score: number;

    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completed_at: Date;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
