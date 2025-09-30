import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileController } from './controllers/user-profile.controller';
import { WorkoutController } from './controllers/workout.controller';
import { UserWorkoutController } from './controllers/user-workout.controller';
import { UserProfileService } from './services/user-profile.service';
import { WorkoutService } from './services/workout.service';
import { UserWorkoutService } from './services/user-workout.service';
import { DatabaseModule } from '../database.module';
import { UserLevelController } from './controllers/user-level.controller';
import { UserLevelService } from './services/user-level.service';
import { LevelController } from './controllers/level.controller';
import { LevelService } from './services/level.service';

import { UserLevelProgress } from './entities/user-level-progress.entity';
import { UserProfile } from './entities/user-profile.entity';
import { UserWorkout } from './entities/user-workout.entity';
import { Workout } from './entities/workout.entity';
import { Level } from './entities/level.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: 'training-db',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'trainingdb',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: false,
                retryAttempts: 10,
                retryDelay: 3000,
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([
            UserLevelProgress,
            UserProfile,
            UserWorkout,
            Workout,
            Level
        ]),
        DatabaseModule,
    ],
    controllers: [
        UserProfileController,
        WorkoutController,
        UserWorkoutController,
        UserLevelController,
        LevelController
    ],
    providers: [
        UserProfileService,
        WorkoutService,
        UserWorkoutService,
        UserLevelService,
        LevelService
    ],
})
export class AppModule { }
