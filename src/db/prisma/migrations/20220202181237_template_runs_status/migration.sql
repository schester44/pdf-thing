-- CreateEnum
CREATE TYPE "RunStatus" AS ENUM ('RUNNING', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "template_runs" ADD COLUMN     "status" "RunStatus" NOT NULL DEFAULT E'RUNNING';
