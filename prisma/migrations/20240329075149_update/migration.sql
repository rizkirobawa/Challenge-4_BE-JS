/*
  Warnings:

  - Changed the type of `identity_type` on the `profiles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "IdentityType" AS ENUM ('KTP', 'SIM', 'Passport');

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "identity_type",
ADD COLUMN     "identity_type" "IdentityType" NOT NULL;
