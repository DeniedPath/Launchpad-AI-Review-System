/*
  Warnings:

  - Added the required column `filename` to the `Assignment` table without a default value. This is not possible if the table is not empty.
*/
-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "filename" TEXT NOT NULL DEFAULT 'unknown.py';

-- If you want to remove the default after migration, you can do so in a follow-up migration.
