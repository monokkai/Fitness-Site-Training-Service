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
            const userProfile = this.userProfileRepository.create({
                ...createUserProfileDto,
                workoutsPerWeek: createUserProfileDto.workoutsPerWeek || 3,
                currentStreak: 0,
                longestStreak: 0,
                totalWorkouts: 0
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
        const profile = await this.userProfileRepository.findOne({
            where: { userId }
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
