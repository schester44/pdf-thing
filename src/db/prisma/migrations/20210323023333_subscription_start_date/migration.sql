-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
