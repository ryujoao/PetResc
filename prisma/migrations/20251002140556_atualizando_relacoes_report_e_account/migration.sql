-- AddForeignKey
ALTER TABLE `denuncias` ADD CONSTRAINT `denuncias_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
