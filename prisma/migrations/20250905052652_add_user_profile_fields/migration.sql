-- AlterTable
ALTER TABLE `users` ADD COLUMN `address` VARCHAR(255) NULL,
    ADD COLUMN `birth_date` DATETIME(0) NULL,
    ADD COLUMN `gender` ENUM('male', 'female', 'other') NULL DEFAULT 'male',
    ADD COLUMN `phone_number` VARCHAR(20) NULL,
    ADD COLUMN `profile_image_url` VARCHAR(255) NULL;
