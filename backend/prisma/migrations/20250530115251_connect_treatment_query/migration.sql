-- AddForeignKey
ALTER TABLE `treatment_queries` ADD CONSTRAINT `treatment_queries_treatmentRecordId_fkey` FOREIGN KEY (`treatmentRecordId`) REFERENCES `treatment_records`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
