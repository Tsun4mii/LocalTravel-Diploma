-- AlterTable
ALTER TABLE `Route` ADD COLUMN `short_description` VARCHAR(191) NOT NULL DEFAULT 'Short description',
    MODIFY `description` TEXT NOT NULL;
