-- AlterTable
ALTER TABLE `fines` ADD COLUMN `item_tran_historyId` INTEGER NULL;

-- AlterTable
ALTER TABLE `notifications` ADD COLUMN `item_id` INTEGER NULL,
    ADD COLUMN `reservation_id` INTEGER NULL,
    MODIFY `type` ENUM('issue', 'return', 'overdue', 'reservation_available', 'reservation_expired', 'fine_due', 'system_maintenance', 'new_item_added', 'item_damaged', 'item_lost') NULL;

-- AlterTable
ALTER TABLE `user_wishlist` ADD COLUMN `item_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `item_tran` (
    `tran_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NULL,
    `status` ENUM('available', 'not available', 'reserved', 'lost', 'damaged') NULL DEFAULT 'available',
    `user_id` INTEGER NULL,
    `record_status` ENUM('active', 'inactive') NULL DEFAULT 'active',

    INDEX `item_id`(`item_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`tran_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_tran_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NULL,
    `tran_id` INTEGER NULL,
    `status` ENUM('issued', 'returned', 'pending', 'rejected', 'overdue') NOT NULL DEFAULT 'pending',
    `requested_by` INTEGER NULL,
    `approved_by` INTEGER NULL,
    `requested_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `approved_at` DATETIME(0) NULL,
    `date_issued` DATE NULL,
    `date_due` DATE NULL,
    `date_returned` DATE NULL,
    `remarks` TEXT NULL,

    INDEX `approved_by`(`approved_by`),
    INDEX `item_id`(`item_id`),
    INDEX `requested_by`(`requested_by`),
    INDEX `tran_id`(`tran_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `library_items` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `author` VARCHAR(255) NOT NULL,
    `isbn` VARCHAR(20) NULL,
    `year` YEAR NULL,
    `genre` VARCHAR(100) NULL,
    `image_url` TEXT NULL,
    `description` TEXT NULL,
    `librarian_id` INTEGER NULL,
    `item_type` ENUM('book', 'journal', 'multimedia', 'newspaper', 'magazine', 'thesis', 'report', 'other') NOT NULL DEFAULT 'book',
    `location` VARCHAR(100) NULL,
    `publisher` VARCHAR(255) NULL,
    `language` VARCHAR(50) NULL,
    `pages` INTEGER NULL,
    `duration` INTEGER NULL,
    `format` VARCHAR(50) NULL,
    `subject` VARCHAR(100) NULL,
    `keywords` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `record_status` ENUM('active', 'inactive') NULL DEFAULT 'active',

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservations` (
    `reservation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NULL,
    `user_id` INTEGER NULL,
    `status` ENUM('pending', 'active', 'expired', 'cancelled', 'fulfilled') NOT NULL DEFAULT 'pending',
    `requested_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expires_at` DATETIME(0) NULL,
    `notified_at` DATETIME(0) NULL,

    INDEX `item_id`(`item_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`reservation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_config` (
    `config_id` INTEGER NOT NULL AUTO_INCREMENT,
    `config_key` VARCHAR(100) NOT NULL,
    `config_value` TEXT NOT NULL,
    `description` VARCHAR(255) NULL,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `system_config_config_key_key`(`config_key`),
    PRIMARY KEY (`config_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `library_cards` (
    `card_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `card_number` VARCHAR(50) NOT NULL,
    `issued_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `expires_at` DATETIME(0) NULL,
    `status` ENUM('active', 'expired', 'suspended', 'cancelled') NOT NULL DEFAULT 'active',

    UNIQUE INDEX `library_cards_card_number_key`(`card_number`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`card_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `item_id` ON `notifications`(`item_id`);

-- CreateIndex
CREATE INDEX `reservation_id` ON `notifications`(`reservation_id`);

-- CreateIndex
CREATE INDEX `item_id` ON `user_wishlist`(`item_id`);

-- AddForeignKey
ALTER TABLE `item_tran` ADD CONSTRAINT `item_tran_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `library_items`(`item_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `item_tran` ADD CONSTRAINT `item_tran_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `item_tran_history` ADD CONSTRAINT `item_tran_history_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `library_items`(`item_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `item_tran_history` ADD CONSTRAINT `item_tran_history_tran_id_fkey` FOREIGN KEY (`tran_id`) REFERENCES `item_tran`(`tran_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `item_tran_history` ADD CONSTRAINT `item_tran_history_requested_by_fkey` FOREIGN KEY (`requested_by`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `item_tran_history` ADD CONSTRAINT `item_tran_history_approved_by_fkey` FOREIGN KEY (`approved_by`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `fines` ADD CONSTRAINT `fines_item_tran_historyId_fkey` FOREIGN KEY (`item_tran_historyId`) REFERENCES `item_tran_history`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `library_items`(`item_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_tran_id_fkey` FOREIGN KEY (`tran_id`) REFERENCES `item_tran`(`tran_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_wishlist` ADD CONSTRAINT `user_wishlist_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `library_items`(`item_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `library_items`(`item_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `library_cards` ADD CONSTRAINT `library_cards_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
