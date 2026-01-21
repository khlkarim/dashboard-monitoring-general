import { MigrationInterface, QueryRunner } from "typeorm";

export class RisksAndActions1769002993250 implements MigrationInterface {
    name = 'RisksAndActions1769002993250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "action" ("description" character varying, "title" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "riskId" uuid NOT NULL, CONSTRAINT "PK_2d9db9cf5edfbbae74eb56e3a39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "risk" ("description" character varying, "criticity" integer, "title" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_955c5a23813b1704181c9a5f7c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "action" ADD CONSTRAINT "FK_2c0d4f18e4f839adfccc1f09a15" FOREIGN KEY ("riskId") REFERENCES "risk"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" DROP CONSTRAINT "FK_2c0d4f18e4f839adfccc1f09a15"`);
        await queryRunner.query(`DROP TABLE "risk"`);
        await queryRunner.query(`DROP TABLE "action"`);
    }

}
