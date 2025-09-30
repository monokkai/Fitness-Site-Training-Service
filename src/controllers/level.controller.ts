import { Controller, Get, Param } from '@nestjs/common';
import { LevelService } from '../services/level.service';

@Controller('levels')
export class LevelController {
    constructor(private readonly levelService: LevelService) {}

    @Get(':id')
    async getLevel(@Param('id') id: string) {
        return this.levelService.getLevelWithWorkouts(+id);
    }

    @Get()
    async getAllLevels() {
        return this.levelService.getAllLevels();
    }
}