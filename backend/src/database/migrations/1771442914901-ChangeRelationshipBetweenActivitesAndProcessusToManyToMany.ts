import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRelationshipBetweenActivitesAndProcessusToManyToMany1771442914901 implements MigrationInterface {
    name = 'ChangeRelationshipBetweenActivitesAndProcessusToManyToMany1771442914901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_5e5061612cdc355e865059caf42"`);
        await queryRunner.query(`CREATE TABLE "activity_processus_processus" ("activityId" uuid NOT NULL, "processusId" uuid NOT NULL, CONSTRAINT "PK_03210cd276cc98487cb115d68d9" PRIMARY KEY ("activityId", "processusId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e2ba667ab49713a7f53d2119cb" ON "activity_processus_processus" ("activityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2afa52d495ca902aaaf494fe9d" ON "activity_processus_processus" ("processusId") `);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "processusId"`);
        await queryRunner.query(`ALTER TABLE "activity_processus_processus" ADD CONSTRAINT "FK_e2ba667ab49713a7f53d2119cba" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "activity_processus_processus" ADD CONSTRAINT "FK_2afa52d495ca902aaaf494fe9d7" FOREIGN KEY ("processusId") REFERENCES "processus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_processus_processus" DROP CONSTRAINT "FK_2afa52d495ca902aaaf494fe9d7"`);
        await queryRunner.query(`ALTER TABLE "activity_processus_processus" DROP CONSTRAINT "FK_e2ba667ab49713a7f53d2119cba"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "processusId" uuid NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2afa52d495ca902aaaf494fe9d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2ba667ab49713a7f53d2119cb"`);
        await queryRunner.query(`DROP TABLE "activity_processus_processus"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_5e5061612cdc355e865059caf42" FOREIGN KEY ("processusId") REFERENCES "processus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
