import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLevelProgress } from '../entities/user-level-progress.entity';
import { UserProfile } from '../entities/user-profile.entity';

@Injectable()
export class UserLevelService {
    constructor(
        @InjectRepository(UserLevelProgress)
        private readonly userLevelRepository: Repository<UserLevelProgress>,

        @InjectRepository(UserProfile)
        private readonly userProfileRepository: Repository<UserProfile>,
    ) { }

    async completeLevel(
        userId: number,
        level: number,
        completionTime: number,
        score: number
    ): Promise<UserLevelProgress> {
        const userProfile = await this.userProfileRepository.findOne({
            where: { userId },
        });

        if (!userProfile) {
            throw new NotFoundException('User profile not found');
        }

        let levelProgress = await this.userLevelRepository.findOne({
            where: { user_id: userId, level },
        });

        if (levelProgress) {
            levelProgress.completed = true;
            levelProgress.completion_time = completionTime;
            levelProgress.score = Math.max(levelProgress.score, score);
            levelProgress.completed_at = new Date();
        } else {
            levelProgress = this.userLevelRepository.create({
                user_id: userId,
                level,
                completed: true,
                completion_time: completionTime,
                score,
                completed_at: new Date(),
            });
        }

        if (level === userProfile.currentLevel) {
            userProfile.currentLevel += 1;
            userProfile.totalXP += 100;
            await this.userProfileRepository.save(userProfile);
        }

        return this.userLevelRepository.save(levelProgress);
    }

    async getUserLevelProgress(userId: number): Promise<UserLevelProgress[]> {
        return this.userLevelRepository.find({
            where: { user_id: userId },
            order: { level: 'ASC' },
        });
    }
}
