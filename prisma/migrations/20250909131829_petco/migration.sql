/*
  Warnings:

  - You are about to drop the column `descricao` on the `animals` table. All the data in the column will be lost.
  - You are about to drop the column `especie` on the `animals` table. All the data in the column will be lost.
  - You are about to drop the column `idade` on the `animals` table. All the data in the column will be lost.
  - You are about to drop the column `photoURL` on the `animals` table. All the data in the column will be lost.
  - You are about to drop the column `porte` on the `animals` table. All the data in the column will be lost.
  - You are about to drop the column `raca` on the `animals` table. All the data in the column will be lost.
  - You are about to drop the column `sexo` on the `animals` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `animals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `animals` DROP COLUMN `descricao`,
    DROP COLUMN `especie`,
    DROP COLUMN `idade`,
    DROP COLUMN `photoURL`,
    DROP COLUMN `porte`,
    DROP COLUMN `raca`,
    DROP COLUMN `sexo`,
    DROP COLUMN `status`;

-- CreateTable
CREATE TABLE `fichas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `photoURL` VARCHAR(191) NULL,
    `especie` VARCHAR(191) NOT NULL,
    `raca` VARCHAR(191) NULL,
    `sexo` VARCHAR(191) NULL,
    `porte` VARCHAR(191) NULL,
    `dataNascimento` DATETIME(3) NULL,
    `idade` INTEGER NULL,
    `peso` DOUBLE NULL,
    `status` ENUM('DISPONIVEL', 'ADOTADO', 'SOBRE_TRATAMENTO') NOT NULL DEFAULT 'DISPONIVEL',
    `saude` VARCHAR(191) NULL,
    `vacinas` VARCHAR(191) NULL,
    `vermifugos` VARCHAR(191) NULL,
    `castrado` BOOLEAN NOT NULL DEFAULT false,
    `alergias` VARCHAR(191) NULL,
    `medicacoes` VARCHAR(191) NULL,
    `ultimaConsulta` DATETIME(3) NULL,
    `microchip` VARCHAR(191) NULL,
    `temperamento` VARCHAR(191) NOT NULL,
    `socializacao` VARCHAR(191) NULL,
    `cuidados` VARCHAR(191) NULL,
    `nivelEnergia` INTEGER NULL,
    `conviveCom` VARCHAR(191) NULL,
    `necessidadesEspeciais` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` INTEGER NULL,
    `animalId` INTEGER NOT NULL,

    UNIQUE INDEX `fichas_microchip_key`(`microchip`),
    UNIQUE INDEX `fichas_animalId_key`(`animalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `denuncias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `localizacao` VARCHAR(191) NOT NULL,
    `anonimo` BOOLEAN NOT NULL DEFAULT false,
    `contato` VARCHAR(191) NOT NULL,
    `animalId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fichas` ADD CONSTRAINT `fichas_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `animals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `denuncias` ADD CONSTRAINT `denuncias_animalId_fkey` FOREIGN KEY (`animalId`) REFERENCES `animals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
