-- CreateTable
CREATE TABLE `treatment_queries` (
    `id` VARCHAR(191) NOT NULL,
    `treatmentRecordId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `treatment_queries_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `treatment_query_responses` (
    `id` VARCHAR(191) NOT NULL,
    `treatmentQueryId` VARCHAR(191) NOT NULL,
    `doctorId` VARCHAR(191) NOT NULL,
    `responseMessage` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `treatment_query_responses_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `treatment_query_responses` ADD CONSTRAINT `treatment_query_responses_treatmentQueryId_fkey` FOREIGN KEY (`treatmentQueryId`) REFERENCES `treatment_queries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
