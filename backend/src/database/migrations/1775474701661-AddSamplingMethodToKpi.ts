import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSamplingMethodToKpi1775474701661 implements MigrationInterface {
    name = 'AddSamplingMethodToKpi1775474701661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kpi" ADD "samplingMethod" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "samplingMethod"`);
    }

}
