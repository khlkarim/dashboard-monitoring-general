import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentsTasksUsers1769031000138 implements MigrationInterface {
    name = 'CommentsTasksUsers1769031000138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_08ca76dcb8eaba103e4266f7f85"`);
        await queryRunner.query(`CREATE TABLE "comment" ("content" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "taskId" uuid, "authorId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "targetValue"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "actualValue"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "processusId"`);
        await queryRunner.query(`ALTER TABLE "risk" DROP COLUMN "criticity"`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD "samples" text`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD "samplingRate" character varying`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD "processusId" uuid`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "validationDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "criticality" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD "startDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "deliverable" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."action_type_enum" AS ENUM('preventive', 'corrective')`);
        await queryRunner.query(`ALTER TABLE "action" ADD "type" "public"."action_type_enum" DEFAULT 'corrective'`);
        await queryRunner.query(`ALTER TABLE "risk" ADD "detection" integer`);
        await queryRunner.query(`ALTER TABLE "risk" ADD "occurrence" integer`);
        await queryRunner.query(`ALTER TABLE "risk" ADD "severity" integer`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."sprint_status_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "status" "public"."sprint_status_enum" NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('todo', 'inProgress', 'blocked', 'done')`);
        await queryRunner.query(`ALTER TABLE "task" ADD "status" "public"."task_status_enum" NOT NULL DEFAULT 'todo'`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD CONSTRAINT "FK_23d8b18820ebade3c38911c08d2" FOREIGN KEY ("processusId") REFERENCES "processus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP CONSTRAINT "FK_23d8b18820ebade3c38911c08d2"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "status" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."sprint_status_enum"`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "status" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "risk" DROP COLUMN "severity"`);
        await queryRunner.query(`ALTER TABLE "risk" DROP COLUMN "occurrence"`);
        await queryRunner.query(`ALTER TABLE "risk" DROP COLUMN "detection"`);
        await queryRunner.query(`ALTER TABLE "action" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."action_type_enum"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "deliverable"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "criticality"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "validationDate"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "processusId"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "samplingRate"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "samples"`);
        await queryRunner.query(`ALTER TABLE "risk" ADD "criticity" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "processusId" uuid`);
        await queryRunner.query(`ALTER TABLE "task" ADD "type" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD "actualValue" numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD "targetValue" numeric(10,2)`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_08ca76dcb8eaba103e4266f7f85" FOREIGN KEY ("processusId") REFERENCES "processus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
