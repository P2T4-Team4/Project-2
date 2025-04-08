-- SQLBook: Code
-- Active: 1743119442391@@127.0.0.1@5432@users_db
-- DROP DATABASE
DROP DATABASE IF EXISTS users_db;

-- CREATE DATABASE
CREATE DATABASE users_db;

DO $$ BEGIN CREATE TYPE "enum_ReadingLists_status" AS ENUM ('reading', 'completed', 'wishlist'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DROP TABLE IF EXISTS "ReadingLists";