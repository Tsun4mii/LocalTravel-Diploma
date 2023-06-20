-- DropForeignKey
ALTER TABLE `Point` DROP FOREIGN KEY `Point_countryId_fkey`;

-- DropForeignKey
ALTER TABLE `Route` DROP FOREIGN KEY `Route_countryId_fkey`;

-- AddForeignKey
ALTER TABLE `Point` ADD CONSTRAINT `Point_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Route` ADD CONSTRAINT `Route_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
