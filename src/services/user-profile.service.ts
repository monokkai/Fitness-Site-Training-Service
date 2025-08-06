import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
            const userProfile = this.userProfileRepository.create({
                ...createUserProfileDto,
                workoutsPerWeek: createUserProfileDto.workoutsPerWeek || 3,
                currentStreak: 0,
                longestStreak: 0,
                totalWorkouts: 0,
                goal: createUserProfileDto.goal || createUserProfileDto.trainingGoal,
            });
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
                cache: true
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
}
