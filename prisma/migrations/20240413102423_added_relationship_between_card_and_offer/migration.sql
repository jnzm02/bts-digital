/*
  Warnings:

  - You are about to drop the `Offer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Offer";

-- CreateTable
CREATE TABLE "offers" (
    "id" SERIAL NOT NULL,
    "bank_name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "cashback" DOUBLE PRECISION NOT NULL,
    "condition" TEXT NOT NULL,
    "expiry" TEXT NOT NULL,
    "restrictions" TEXT NOT NULL,
    "card_id" INTEGER NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
