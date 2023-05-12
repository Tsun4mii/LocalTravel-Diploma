-- AlterTable
ALTER TABLE `Point` ADD COLUMN `countryId` VARCHAR(191) NOT NULL DEFAULT '6c78bd0d-ae6c-4df8-9025-5f699d26cf2c';

-- AddForeignKey
ALTER TABLE `Point` ADD CONSTRAINT `Point_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
