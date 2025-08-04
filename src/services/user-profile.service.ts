import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { CreateUserProfileDto } from '../dto/create-user-profile.dto';

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile)
        private userProfileRepository: Repository<UserProfile>,
    ) { }

    async create(createUserProfileDto: CreateUserProfileDto): Promise<UserProfile> {
        const userProfile = this.userProfileRepository.create(createUserProfileDto);
        return this.userProfileRepository.save(userProfile);
    }

    async findByUserId(userId: number): Promise<UserProfile> {
        const profile = await this.userProfileRepository.findOne({
            where: { userId },
            select: [
                'id', 'userId', 'age', 'weight', 'height', 'sex',
                'trainingGoal', 'workoutsPerWeek', 'currentStreak',
                'longestStreak', 'totalWorkouts', 'createdAt', 'updatedAt'
            ]
        });

        if (!profile) {
            throw new NotFoundException(`User profile with ID ${userId} not found`);
        }

        return {
            ...profile,
            age: profile.age || 0,
            weight: profile.weight || 0,
            height: profile.height || 0,
            workoutsPerWeek: profile.workoutsPerWeek || 3,
            currentStreak: profile.currentStreak || 0,
            longestStreak: profile.longestStreak || 0,
            totalWorkouts: profile.totalWorkouts || 0
        };
    }
}
