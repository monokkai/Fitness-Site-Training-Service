import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserProfileService } from '../services/user-profile.service';
import { CreateUserProfileDto } from '../dto/create-user-profile.dto';

@Controller('user-profiles')
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) { }

    @Post()
    async create(@Body() createUserProfileDto: CreateUserProfileDto) {
        return this.userProfileService.create(createUserProfileDto);
    }

    @Get(':userId')
    async findOne(@Param('userId') userId: string) {
        return this.userProfileService.findByUserId(+userId);
    }
}
