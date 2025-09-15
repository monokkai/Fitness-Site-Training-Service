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

// Импортируйте сущности
import { UserLevelProgress } from './entities/user-level-progress.entity';
import { UserProfile } from './entities/user-profile.entity';
import { UserWorkout } from './entities/user-workout.entity';
import { Workout } from './entities/workout.entity';

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
            Workout
        ]),
        DatabaseModule,
    ],
    controllers: [
        UserProfileController,
        WorkoutController,
        UserWorkoutController,
        UserLevelController
    ],
    providers: [
        UserProfileService,
        WorkoutService,
        UserWorkoutService,
        UserLevelService
    ],
})
export class AppModule { }
