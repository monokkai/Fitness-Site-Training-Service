import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './src/entities/user-profile.entity';
import { Workout } from './src/entities/workout.entity';
import { UserWorkout } from './src/entities/user-workout.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserProfile, Workout, UserWorkout]),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
