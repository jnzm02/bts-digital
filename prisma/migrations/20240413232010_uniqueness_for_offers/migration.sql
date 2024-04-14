/*
  Warnings:

  - A unique constraint covering the columns `[card_type,bank_id,condition]` on the table `offers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "offers" ADD COLUMN     "category" TEXT NOT NULL,
ALTER COLUMN "card_type" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "offers_card_type_bank_id_condition_key" ON "offers"("card_type", "bank_id", "condition");
