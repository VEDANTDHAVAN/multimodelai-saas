/*
  Warnings:

  - You are about to drop the column `status` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCurrentPeriodEnd` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionId` on the `UserSubscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSubscription" DROP COLUMN "status",
DROP COLUMN "stripeCurrentPeriodEnd",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "stripePriceId",
DROP COLUMN "stripeSubscriptionId",
ADD COLUMN     "razorpayCustomerId" TEXT,
ADD COLUMN     "razorpaySubscriptionId" TEXT;
