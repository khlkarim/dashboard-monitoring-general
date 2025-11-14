import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sprint1762984134368 implements MigrationInterface {
  name = 'Sprint1762984134368';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sprint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f371c7b5c4bc62fb2ba2bdb9f61" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sprint"`);
  }
}
