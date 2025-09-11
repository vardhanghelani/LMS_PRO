-- CreateTable
CREATE TABLE `book_tran` (
    `tran_id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_id` INTEGER NULL,
    `status` ENUM('available', 'not available') NULL DEFAULT 'available',
    `user_id` INTEGER NULL,
    `record_status` ENUM('active', 'inactive') NULL DEFAULT 'active',

    INDEX `book_id`(`book_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`tran_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book_tran_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_id` INTEGER NULL,
    `tran_id` INTEGER NULL,
    `status` ENUM('issued', 'returned', 'pending', 'rejected') NOT NULL DEFAULT 'pending',
    `requested_by` INTEGER NULL,
    `approved_by` INTEGER NULL,
    `requested_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `approved_at` DATETIME(0) NULL,
    `date_issued` DATE NULL,
    `date_due` DATE NULL,
    `date_returned` DATE NULL,
    `remarks` TEXT NULL,

    INDEX `approved_by`(`approved_by`),
    INDEX `book_id`(`book_id`),
    INDEX `requested_by`(`requested_by`),
    INDEX `tran_id`(`tran_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `book_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `author` VARCHAR(255) NOT NULL,
    `isbn` VARCHAR(20) NULL,
    `year` YEAR NULL,
    `genre` VARCHAR(100) NULL,
    `image_url` TEXT NULL,
    `description` TEXT NULL,
    `librarian_id` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `record_status` ENUM('active', 'inactive') NULL DEFAULT 'active',

    PRIMARY KEY (`book_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fines` (
    `fine_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `book_tran_history_id` INTEGER NULL,
    `amount` DECIMAL(10, 2) NULL,
    `reason` TEXT NULL,
    `status` ENUM('unpaid', 'paid') NULL DEFAULT 'unpaid',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `paid_at` DATETIME(0) NULL,

    INDEX `book_tran_history_id`(`book_tran_history_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`fine_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logs` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` TEXT NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `notification_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('issue', 'return') NULL,
    `book_id` INTEGER NULL,
    `from_user_id` INTEGER NULL,
    `to_user_id` INTEGER NULL,
    `tran_id` INTEGER NULL,
    `status` ENUM('pending', 'approved', 'rejected') NULL DEFAULT 'pending',
    `message` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `resolved_at` DATETIME(0) NULL,

    INDEX `book_id`(`book_id`),
    INDEX `from_user_id`(`from_user_id`),
    INDEX `to_user_id`(`to_user_id`),
    INDEX `tran_id`(`tran_id`),
    PRIMARY KEY (`notification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_wishlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `book_id` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `book_id`(`book_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `password_hash` VARCHAR(255) NULL,
    `role` ENUM('patron', 'librarian', 'admin') NULL DEFAULT 'patron',
    `status` ENUM('active', 'banned') NULL DEFAULT 'active',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_us` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `email` VARCHAR(255) NULL,
    `subject` VARCHAR(255) NULL,
    `message` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `book_tran` ADD CONSTRAINT `book_tran_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books`(`book_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `book_tran` ADD CONSTRAINT `book_tran_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `book_tran_history` ADD CONSTRAINT `book_tran_history_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books`(`book_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `book_tran_history` ADD CONSTRAINT `book_tran_history_ibfk_2` FOREIGN KEY (`tran_id`) REFERENCES `book_tran`(`tran_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `book_tran_history` ADD CONSTRAINT `book_tran_history_ibfk_4` FOREIGN KEY (`requested_by`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `book_tran_history` ADD CONSTRAINT `book_tran_history_ibfk_5` FOREIGN KEY (`approved_by`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `fines` ADD CONSTRAINT `fines_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `fines` ADD CONSTRAINT `fines_ibfk_2` FOREIGN KEY (`book_tran_history_id`) REFERENCES `book_tran_history`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `logs` ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books`(`book_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`from_user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_ibfk_3` FOREIGN KEY (`to_user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_ibfk_4` FOREIGN KEY (`tran_id`) REFERENCES `book_tran`(`tran_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_wishlist` ADD CONSTRAINT `user_wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_wishlist` ADD CONSTRAINT `user_wishlist_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books`(`book_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
