/*
  Warnings:

  - You are about to drop the column `card_id` on the `offers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_card_id_fkey";

-- AlterTable
ALTER TABLE "offers" DROP COLUMN "card_id",
ADD COLUMN     "card_type" TEXT NOT NULL DEFAULT '';
