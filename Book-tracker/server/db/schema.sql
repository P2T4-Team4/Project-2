-- Active: 1740443733998@@127.0.0.1@5432@company
-- DROP DATABASE
DROP DATABASE IF EXISTS users_db;

-- CREATE DATABASE
CREATE DATABASE users_db;

DO $$ BEGIN CREATE TYPE "enum_ReadingLists_status" AS ENUM ('reading', 'completed', 'wishlist'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DROP TABLE IF EXISTS "ReadingLists";

CREATE TABLE IF NOT EXISTS "ReadingLists" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "book_title" TEXT NOT NULL,
    "book_author" TEXT NOT NULL,
    "status" "enum_ReadingLists_status" DEFAULT 'wishlist',
    FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Users" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);