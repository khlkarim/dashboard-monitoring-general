import { MigrationInterface, QueryRunner } from 'typeorm';

export class SprintTaskKpiAttributes1762987053239
  implements MigrationInterface
{
  name = 'SprintTaskKpiAttributes1762987053239';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sprint" ADD "endDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sprint" ADD "startDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sprint" ADD "goal" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "sprint" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sprint" ADD "createdById" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "dueDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "reporterId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "assigneeId" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "task" ADD "sprintId" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "kpi" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "kpi" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sprint" ADD CONSTRAINT "FK_4d1f6abd26e04b838bdfdaa2145" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_d7263b567c2d0945fd5aa9ab671" FOREIGN KEY ("reporterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_7384988f7eeb777e44802a0baca" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_5ad8a047b8f023bf36b2a232a42" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_5ad8a047b8f023bf36b2a232a42"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_7384988f7eeb777e44802a0baca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_d7263b567c2d0945fd5aa9ab671"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sprint" DROP CONSTRAINT "FK_4d1f6abd26e04b838bdfdaa2145"`,
    );
    await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "sprintId"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "assigneeId"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "reporterId"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "dueDate"`);
    await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "createdById"`);
    await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "goal"`);
    await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "startDate"`);
    await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "endDate"`);
  }
}
