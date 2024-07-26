-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_major_id_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `major_id` CHAR(36) NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_major_id_fkey` FOREIGN KEY (`major_id`) REFERENCES `majors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
