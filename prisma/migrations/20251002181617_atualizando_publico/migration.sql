/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Publico` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Publico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `publico` ADD COLUMN `cpf` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Publico_cpf_key` ON `Publico`(`cpf`);
