/*
  Warnings:

  - You are about to drop the column `Category` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `PosterPath` on the `Item` table. All the data in the column will be lost.
  - Added the required column `category` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterPath` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('MOVIE', 'MUSIC', 'BOOK', 'TV');

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "Category",
DROP COLUMN "Name",
DROP COLUMN "PosterPath",
ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "posterPath" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Type";
