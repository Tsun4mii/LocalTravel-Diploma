-- CreateTable
CREATE TABLE `AdminRegistrationCode` (
    `id` VARCHAR(191) NOT NULL,
    `recepientEmail` VARCHAR(191) NOT NULL,
    `codeHash` VARCHAR(191) NOT NULL,
    `status` ENUM('WAITING_FOR_APPROVAL', 'APPROVED', 'USED') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
