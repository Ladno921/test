/*
  Warnings:

  - Added the required column `seller_id` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` ADD COLUMN `seller_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `seller`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
