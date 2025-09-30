# 💪 Training Service

## Overview

The Training Service manages workout data, user progress tracking, and training analytics for the HandFit application. Built with NestJS and TypeORM, it provides comprehensive workout management with PostgreSQL database storage.

## 🏗️ Architecture

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Port**: 3000 (internal)
- **Pattern**: Domain-Driven Design with Repository Pattern

## 🔧 Core Features

### 1. Workout Management

- **Workout CRUD operations** with detailed exercise information
- **Difficulty-based filtering** (easy, medium, hard)
- **Category organization** (strength, cardio, flexibility, core)
- **Duration and repetition tracking**
- **Video and image URL storage**

### 2. User Progress Tracking

- **Workout completion recording** with timestamps
- **Performance metrics** (completion time, actual repeats, score)
- **User workout history** and analytics
- **Progress visualization data**

### 3. User Profile Management

- **Training profiles** with goals and preferences
- **XP and level tracking** system
- **Workout statistics** and achievements
- **Personalized training recommendations**

### 4. Level System

- **Progressive difficulty levels** with XP requirements
- **Level-based workout unlocking**
- **User level progression tracking**
- **Achievement and milestone system**

## 📡 API Endpoints

### Workout Routes

```
GET    /workouts              - Get all workouts
GET    /workouts/:id          - Get workout by ID
GET    /workouts/difficulty/:difficulty - Get workouts by difficulty
```

### User Workout Routes

```
POST   /user-workouts         - Record workout completion
GET    /user-workouts/:userId - Get user's workout history
```

### User Profile Routes

```
POST   /user-profiles         - Create user training profile
GET    /user-profiles/:userId - Get user's training profile
```

### Level Routes

```
GET    /levels                - Get all training levels
GET    /levels/:id            - Get specific level details
```

## 🗄️ Database Schema

### Workouts Table

```sql
- id (serial, primary key)
- title (varchar, nullable)
- description (text, not null)
- difficulty (varchar, not null)
- image_url (varchar, nullable)
- duration (integer, not null)
- repeats (integer, nullable)
- video_url (varchar, nullable)
- category (varchar, not null)
- created_at (timestamp, default now)
- updated_at (timestamp, default now)
```

### User Workouts Table

```sql
- id (serial, primary key)
- user_id (integer, not null)
- workout_id (integer, not null)
- completed (boolean, default false)
- completion_time (integer, nullable)
- actual_repeats (integer, nullable)
- score (integer, nullable)
- completed_at (timestamp, nullable)
- created_at (timestamp, default now)
```

### User Profiles Table

```sql
- id (serial, primary key)
- userId (integer, unique, not null)
- goal (varchar, nullable)
- workoutsPerWeek (integer, default 3)
- currentStreak (integer, default 0)
- longestStreak (integer, default 0)
- totalWorkouts (integer, default 0)
- age (integer, nullable)
- weight (decimal, nullable)
- height (decimal, nullable)
- sex (varchar, nullable)
- created_at (timestamp, default now)
- updated_at (timestamp, default now)
```

## 🚀 Quick Start

```bash
cd deploy
docker-compose up --build
```

## 🔄 Service Integration

- **API Gateway**: Routes training-related requests
- **Auth Service**: Validates user authentication
- **Users Service**: Shares user profile data
- **Frontend**: Receives workout data and tracks progress

## 📊 Analytics & Tracking

- **Workout completion rates** by difficulty and category
- **User progress metrics** (streaks, total workouts, XP)
- **Performance analytics** (completion times, scores)
- **Training pattern analysis** for recommendations

## 🎯 Gamification Features

- **XP reward system** for completed workouts
- **Level progression** based on accumulated XP
- **Achievement tracking** and milestones
- **Streak counting** for consistency motivation
- **Performance scoring** system

## 🛡️ Data Validation

- **DTO validation** for all input data
- **Entity constraints** at database level
- **Business logic validation** in services
- **Error handling** with descriptive messages

## 🔧 Technical Features

- **TypeORM migrations** for database schema management
- **Repository pattern** for data access abstraction
- **Service layer** for business logic separation
- **Controller layer** for HTTP request handling
- **Entity relationships** with foreign key constraints
