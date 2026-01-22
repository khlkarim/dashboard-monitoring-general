import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeEnumFormat1769079909236 implements MigrationInterface {
    name = 'ChangeEnumFormat1769079909236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."sprint_status_enum" RENAME TO "sprint_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."sprint_status_enum" AS ENUM('PLANNED', 'ACTIVE', 'COMPLETED')`);
        await queryRunner.query(`ALTER TABLE "sprint" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sprint" ALTER COLUMN "status" TYPE "public"."sprint_status_enum" USING "status"::"text"::"public"."sprint_status_enum"`);
        await queryRunner.query(`ALTER TABLE "sprint" ALTER COLUMN "status" SET DEFAULT 'PLANNED'`);
        await queryRunner.query(`DROP TYPE "public"."sprint_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."task_status_enum" RENAME TO "task_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE')`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" TYPE "public"."task_status_enum" USING "status"::"text"::"public"."task_status_enum"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'TODO'`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."action_type_enum" RENAME TO "action_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."action_type_enum" AS ENUM('PREVENTIVE', 'CORRECTIVE')`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "type" TYPE "public"."action_type_enum" USING "type"::"text"::"public"."action_type_enum"`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "type" SET DEFAULT 'CORRECTIVE'`);
        await queryRunner.query(`DROP TYPE "public"."action_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."action_type_enum_old" AS ENUM('preventive', 'corrective')`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "type" TYPE "public"."action_type_enum_old" USING "type"::"text"::"public"."action_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "action" ALTER COLUMN "type" SET DEFAULT 'corrective'`);
        await queryRunner.query(`DROP TYPE "public"."action_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."action_type_enum_old" RENAME TO "action_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum_old" AS ENUM('todo', 'inProgress', 'blocked', 'done')`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" TYPE "public"."task_status_enum_old" USING "status"::"text"::"public"."task_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'todo'`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."task_status_enum_old" RENAME TO "task_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."sprint_status_enum_old" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "sprint" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sprint" ALTER COLUMN "status" TYPE "public"."sprint_status_enum_old" USING "status"::"text"::"public"."sprint_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "sprint" ALTER COLUMN "status" SET DEFAULT '1'`);
        await queryRunner.query(`DROP TYPE "public"."sprint_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."sprint_status_enum_old" RENAME TO "sprint_status_enum"`);
    }

}
