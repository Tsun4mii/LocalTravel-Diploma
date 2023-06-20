/*
  Warnings:

  - The values [ADMIN] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `username` VARCHAR(191) NULL,
    MODIFY `role` ENUM('USER', 'PREMIUM') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `_ImageToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ImageToUser_AB_unique`(`A`, `B`),
    INDEX `_ImageToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ImageToUser` ADD CONSTRAINT `_ImageToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ImageToUser` ADD CONSTRAINT `_ImageToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
