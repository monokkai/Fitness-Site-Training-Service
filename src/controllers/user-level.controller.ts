import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserLevelService } from '../services/user-level.service';

@Controller('user-levels')
export class UserLevelController {
    constructor(private readonly userLevelService: UserLevelService) { }

    @Post('complete')
    async completeLevel(
        @Body() body: { userId: number; level: number; completionTime: number; score: number }
    ) {
        return this.userLevelService.completeLevel(
            body.userId,
            body.level,
            body.completionTime,
            body.score
        );
    }

    @Get(':userId')
    async getUserLevelProgress(@Param('userId') userId: string) {
        return this.userLevelService.getUserLevelProgress(+userId);
    }
}
