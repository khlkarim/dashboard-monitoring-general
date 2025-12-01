import { MigrationInterface, QueryRunner } from "typeorm";

export class Processus1764625019089 implements MigrationInterface {
    name = 'Processus1764625019089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "processus" ("description" character varying, "label" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e558b2c4521de28be2898f25587" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "processusId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_08ca76dcb8eaba103e4266f7f85" FOREIGN KEY ("processusId") REFERENCES "processus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_08ca76dcb8eaba103e4266f7f85"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "processusId"`);
        await queryRunner.query(`DROP TABLE "processus"`);
    }

}
