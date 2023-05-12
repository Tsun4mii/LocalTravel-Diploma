-- CreateTable
CREATE TABLE `Follow` (
    `id` VARCHAR(191) NOT NULL,
    `notify` BOOLEAN NOT NULL DEFAULT true,
    `followerId` VARCHAR(191) NOT NULL,
    `followingIs` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_followingIs_fkey` FOREIGN KEY (`followingIs`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
