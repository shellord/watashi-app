/*
  Warnings:

  - You are about to drop the column `category` on the `Item` table. All the data in the column will be lost.
  - Added the required column `category` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "List_name_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "category",
ALTER COLUMN "posterPath" DROP NOT NULL;

-- AlterTable
ALTER TABLE "List" ADD COLUMN     "category" "Category" NOT NULL;

-- CreateTable
CREATE TABLE "Follows" (
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId","followingId")
);

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
