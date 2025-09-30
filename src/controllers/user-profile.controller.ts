import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserProfileService } from '../services/user-profile.service';
import { CreateUserProfileDto } from '../dto/create-user-profile.dto';
import { UserProfile } from 'src/entities/user-profile.entity';
import { NotFoundException } from '@nestjs/common';

@Controller('user-profiles')
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) { }

    @Post()
    async create(@Body() createUserProfileDto: CreateUserProfileDto) {
        return this.userProfileService.create(createUserProfileDto);
    }

    @Get(':userId')
    async findOne(@Param('userId') userId: string): Promise<UserProfile> {
        const profile = await this.userProfileService.findByUserId(+userId);
        if (!profile) {
            throw new NotFoundException('Profile not found');
        }
        return profile;
    }

    @Put(':userId/xp')
    async updateXP(
        @Param('userId') userId: string,
        @Body() body: { xpGained: number }
    ): Promise<UserProfile> {
        return this.userProfileService.updateXP(+userId, body.xpGained);
    }
}
