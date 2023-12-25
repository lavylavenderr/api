/*
  Warnings:

  - You are about to drop the column `endpoint` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `requestip` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `useragent` on the `Request` table. All the data in the column will be lost.
  - Added the required column `ip` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `route` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Request_id_key";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "endpoint",
DROP COLUMN "requestip",
DROP COLUMN "time",
DROP COLUMN "useragent",
ADD COLUMN     "ip" TEXT NOT NULL,
ADD COLUMN     "route" TEXT NOT NULL;
