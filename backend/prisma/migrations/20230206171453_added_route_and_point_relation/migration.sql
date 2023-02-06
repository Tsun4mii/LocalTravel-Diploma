-- CreateTable
CREATE TABLE `Route` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PointToRoute` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PointToRoute_AB_unique`(`A`, `B`),
    INDEX `_PointToRoute_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PointToRoute` ADD CONSTRAINT `_PointToRoute_A_fkey` FOREIGN KEY (`A`) REFERENCES `Point`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PointToRoute` ADD CONSTRAINT `_PointToRoute_B_fkey` FOREIGN KEY (`B`) REFERENCES `Route`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
