import { MigrationInterface, QueryRunner } from "typeorm";

export class ProcessusActivitesUsers1769604524947 implements MigrationInterface {
    name = 'ProcessusActivitesUsers1769604524947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kpi" DROP CONSTRAINT "FK_117defdaa57dcb42206cfdeb482"`);
        await queryRunner.query(`ALTER TABLE "kpi" RENAME COLUMN "createdById" TO "managerId"`);
        await queryRunner.query(`CREATE TABLE "activity" ("endDate" TIMESTAMP, "startDate" TIMESTAMP, "description" character varying, "title" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "processusId" uuid NOT NULL, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_status" ("precedence" integer, "description" character varying, "title" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b8747cc6a41b6cef4639babf61d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "workplace" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "mandate" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "processusId" uuid`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD CONSTRAINT "FK_dd5b68b51d3d7afe01be3970cd5" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_5e5061612cdc355e865059caf42" FOREIGN KEY ("processusId") REFERENCES "processus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_08ca76dcb8eaba103e4266f7f85" FOREIGN KEY ("processusId") REFERENCES "processus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_08ca76dcb8eaba103e4266f7f85"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_5e5061612cdc355e865059caf42"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP CONSTRAINT "FK_dd5b68b51d3d7afe01be3970cd5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "processusId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mandate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "workplace"`);
        await queryRunner.query(`DROP TABLE "task_status"`);
        await queryRunner.query(`DROP TABLE "activity"`);
        await queryRunner.query(`ALTER TABLE "kpi" RENAME COLUMN "managerId" TO "createdById"`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD CONSTRAINT "FK_117defdaa57dcb42206cfdeb482" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
