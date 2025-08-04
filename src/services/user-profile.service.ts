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
            where: { userId: userId }
        });
        if (!profile) {
            throw new NotFoundException(`User profile with ID ${userId} not found`);
        }
        return profile;
    }
}
