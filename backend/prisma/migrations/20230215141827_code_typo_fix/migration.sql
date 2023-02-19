/*
  Warnings:

  - You are about to drop the column `recepientEmail` on the `AdminRegistrationCode` table. All the data in the column will be lost.
  - Added the required column `recipientEmail` to the `AdminRegistrationCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AdminRegistrationCode` DROP COLUMN `recepientEmail`,
    ADD COLUMN `recipientEmail` VARCHAR(191) NOT NULL;
