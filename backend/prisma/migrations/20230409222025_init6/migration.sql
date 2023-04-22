/*
  Warnings:

  - Added the required column `email` to the `UserDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userdetail` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;
