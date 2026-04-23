import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationBetweenRisksAndProcessus1776963233692 implements MigrationInterface {
    name = 'AddRelationBetweenRisksAndProcessus1776963233692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "risk" ADD "processusId" uuid`);
        await queryRunner.query(`ALTER TABLE "risk" ADD CONSTRAINT "FK_603dccc00e8e85ec52345f7a5a6" FOREIGN KEY ("processusId") REFERENCES "processus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "risk" DROP CONSTRAINT "FK_603dccc00e8e85ec52345f7a5a6"`);
        await queryRunner.query(`ALTER TABLE "risk" DROP COLUMN "processusId"`);
    }

}
