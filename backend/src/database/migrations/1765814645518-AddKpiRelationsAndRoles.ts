import { MigrationInterface, QueryRunner } from "typeorm";

export class AddKpiRelationsAndRoles1765814645518 implements MigrationInterface {
    name = 'AddKpiRelationsAndRoles1765814645518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kpi" ADD "targetValue" numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD "actualValue" numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD "sprintId" uuid`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD "createdById" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD CONSTRAINT "FK_f063a85096c1cca8dcfaf76a016" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD CONSTRAINT "FK_117defdaa57dcb42206cfdeb482" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kpi" DROP CONSTRAINT "FK_117defdaa57dcb42206cfdeb482"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP CONSTRAINT "FK_f063a85096c1cca8dcfaf76a016"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "sprintId"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "actualValue"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "targetValue"`);
    }

}
