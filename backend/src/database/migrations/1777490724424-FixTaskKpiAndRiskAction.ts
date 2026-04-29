import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTaskKpiAndRiskAction1777490724424 implements MigrationInterface {
    name = 'FixTaskKpiAndRiskAction1777490724424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "estimatedEndDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "estimatedStartDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "expectedDelivrable" character varying`);
        await queryRunner.query(`ALTER TABLE "task" ADD "processusId" uuid`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD "targetSamples" text`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD "sampleDates" text`);
        await queryRunner.query(`ALTER TYPE "public"."action_type_enum" RENAME TO "action_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."action_type_enum" AS ENUM('PREVENTIVE', 'CORRECTIVE', 'MESUREMENT_METHOD')`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "type" TYPE "public"."action_type_enum" USING "type"::"text"::"public"."action_type_enum"`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "type" SET DEFAULT 'CORRECTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."action_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_da41e80e32fed11b671a2c3722d" FOREIGN KEY ("processusId") REFERENCES "processus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_da41e80e32fed11b671a2c3722d"`);
        await queryRunner.query(`CREATE TYPE "public"."action_type_enum_old" AS ENUM('PREVENTIVE', 'CORRECTIVE')`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "type" TYPE "public"."action_type_enum_old" USING "type"::"text"::"public"."action_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "type" SET DEFAULT 'CORRECTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."action_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."action_type_enum_old" RENAME TO "action_type_enum"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "sampleDates"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "targetSamples"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "processusId"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "expectedDelivrable"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "estimatedStartDate"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "estimatedEndDate"`);
    }

}
