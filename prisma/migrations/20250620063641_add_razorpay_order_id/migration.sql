-- AlterTable
ALTER TABLE "UserSubscription" ADD COLUMN     "planName" TEXT NOT NULL DEFAULT 'Free',
ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT;
