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
        console.log('Creating profile with data:', createUserProfileDto);
        try {
            const userProfileData = {
                ...createUserProfileDto,
                workoutsPerWeek: createUserProfileDto.workoutsPerWeek || 3,
                currentStreak: 0,
                longestStreak: 0,
                totalWorkouts: 0,
                goal: createUserProfileDto.goal || createUserProfileDto.trainingGoal,
                age: createUserProfileDto.age ?? null,
                weight: createUserProfileDto.weight ?? null,
                height: createUserProfileDto.height ?? null,
                sex: createUserProfileDto.sex ?? null,
            };

            const userProfile = this.userProfileRepository.create(userProfileData);
            const result = await this.userProfileRepository.save(userProfile);
            console.log('Profile created successfully:', result);
            return result;
        } catch (error) {
            console.error('Error creating profile:', error);
            throw error;
        }
    }

    async findByUserId(userId: number): Promise<UserProfile> {
        console.log(`Fetching profile for user ${userId}`);
        try {
            const profile = await this.userProfileRepository.findOne({
                where: { userId },
            });

            if (!profile) {
                console.warn('Profile not found');
                throw new NotFoundException();
            }

            console.log('Found profile:', profile);
            return profile;
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    }

    async updateXP(userId: number, xpGained: number): Promise<UserProfile> {
        const profile = await this.findByUserId(userId);
        profile.totalXP += xpGained;
        profile.totalWorkouts += 1;
        
        // Level up logic: every 500 XP = 1 level
        const newLevel = Math.floor(profile.totalXP / 500) + 1;
        if (newLevel > profile.currentLevel) {
            profile.currentLevel = newLevel;
        }
        
        return this.userProfileRepository.save(profile);
    }
}
