/*
  Warnings:

  - Added the required column `countryId` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Point` ADD COLUMN `address` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Route` ADD COLUMN `countryId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Country` (
    `id` VARCHAR(191) NOT NULL,
    `countryName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `categoryName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToRoute` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CategoryToRoute_AB_unique`(`A`, `B`),
    INDEX `_CategoryToRoute_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Route` ADD CONSTRAINT `Route_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToRoute` ADD CONSTRAINT `_CategoryToRoute_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToRoute` ADD CONSTRAINT `_CategoryToRoute_B_fkey` FOREIGN KEY (`B`) REFERENCES `Route`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
