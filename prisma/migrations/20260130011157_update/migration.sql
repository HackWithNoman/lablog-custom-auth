/*
  Warnings:

  - The values [AVILABLE] on the enum `EquipmentStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EquipmentStatus_new" AS ENUM ('AVAILABLE', 'IN_USE', 'MAINTENANCE');
ALTER TABLE "public"."Equipment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Equipment" ALTER COLUMN "status" TYPE "EquipmentStatus_new" USING ("status"::text::"EquipmentStatus_new");
ALTER TYPE "EquipmentStatus" RENAME TO "EquipmentStatus_old";
ALTER TYPE "EquipmentStatus_new" RENAME TO "EquipmentStatus";
DROP TYPE "public"."EquipmentStatus_old";
ALTER TABLE "Equipment" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterTable
ALTER TABLE "Equipment" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
