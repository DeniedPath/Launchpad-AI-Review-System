/*
  Warnings:

  - Added the required column `passwordHash` to the `AdminUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminUser" ADD COLUMN "passwordHash" TEXT;

-- Set a default password hash for existing users (password: admin123)
UPDATE "AdminUser" SET "passwordHash" = '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZGHFQW1Yy1Q9wF6r0Yy3l8Q3eF5lK' WHERE "passwordHash" IS NULL;

-- Set NOT NULL constraint
ALTER TABLE "AdminUser" ALTER COLUMN "passwordHash" SET NOT NULL;
