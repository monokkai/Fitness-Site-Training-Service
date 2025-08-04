CREATE TABLE "UserProfiles" (
  "Id" SERIAL PRIMARY KEY,
  "UserId" INTEGER NOT NULL UNIQUE,
  "Age" INTEGER,
  "Weight" DECIMAL(5,2),
  "Height" INTEGER,
  "Sex" VARCHAR(10) CHECK ("Sex" IN ('Male', 'Female', 'Other')),
  "TrainingGoal" VARCHAR(20) CHECK ("TrainingGoal" IN ('WeightGain', 'WeightLoss', 'Cardio')),
  "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Workouts" (
  "Id" SERIAL PRIMARY KEY,
  "Name" VARCHAR(100) NOT NULL,
  "Description" TEXT,
  "Type" VARCHAR(20) CHECK ("Type" IN ('WeightGain', 'WeightLoss', 'Cardio')),
  "DurationMinutes" INTEGER NOT NULL,
  "Difficulty" VARCHAR(20) CHECK ("Difficulty" IN ('Beginner', 'Intermediate', 'Advanced'))
);

CREATE TABLE "UserWorkouts" (
  "Id" SERIAL PRIMARY KEY,
  "UserId" INTEGER NOT NULL REFERENCES "UserProfiles"("UserId") ON DELETE CASCADE,
  "WorkoutId" INTEGER NOT NULL REFERENCES "Workouts"("Id") ON DELETE CASCADE,
  "CompletedAt" TIMESTAMP
);
