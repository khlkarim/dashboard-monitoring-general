import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoreSprintTaskAttributes1763142690491
  implements MigrationInterface
{
  name = 'MoreSprintTaskAttributes1763142690491';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sprint" ADD "status" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "task" ADD "type" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "task" ADD "status" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "status"`);
  }
}
