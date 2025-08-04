import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileController } from './controllers/user-profile.controller';
import { WorkoutController } from './controllers/workout.controller';
import { UserWorkoutController } from './controllers/user-workout.controller';
import { UserProfileService } from './services/user-profile.service';
import { WorkoutService } from './services/workout.service';
import { UserWorkoutService } from './services/user-workout.service';
import { DatabaseModule } from '../database.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        DatabaseModule,
    ],
    controllers: [UserProfileController, WorkoutController, UserWorkoutController],
    providers: [UserProfileService, WorkoutService, UserWorkoutService],
})
export class AppModule { }
