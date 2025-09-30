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
                totalXP: 0,
                currentLevel: 1,
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
                relations: ['levelProgress', 'workouts']
            });

            if (!profile) {
                console.warn('Profile not found');
                throw new NotFoundException();
            }

            const profileWithDefaults = {
                ...profile,
                totalXP: profile.totalXP || 0,
                currentLevel: profile.currentLevel || 1,
                currentStreak: profile.currentStreak || 0,
                longestStreak: profile.longestStreak || 0,
                totalWorkouts: profile.totalWorkouts || 0,
                workoutsPerWeek: profile.workoutsPerWeek || 3,
                levelProgress: profile.levelProgress || [],
                workouts: profile.workouts || []
            };

            console.log('Found profile:', profileWithDefaults);
            return profileWithDefaults;
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    }

    async updateXP(userId: number, xpGained: number): Promise<UserProfile> {
        const profile = await this.findByUserId(userId);
        profile.totalXP += xpGained;
        profile.totalWorkouts += 1;
        
        const newLevel = Math.floor(profile.totalXP / 500) + 1;
        if (newLevel > profile.currentLevel) {
            profile.currentLevel = newLevel;
        }
        
        return this.userProfileRepository.save(profile);
    }

    async updateProfile(userId: number, updateData: Partial<UserProfile>): Promise<UserProfile> {
        const profile = await this.findByUserId(userId);
        
        Object.assign(profile, updateData);
        profile.updatedAt = new Date();
        
        return this.userProfileRepository.save(profile);
    }
}
