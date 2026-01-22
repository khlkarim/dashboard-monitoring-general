import { MigrationInterface, QueryRunner } from "typeorm";

export class Notifications1769120025308 implements MigrationInterface {
    name = 'Notifications1769120025308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification" ("description" character varying, "title" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification_recipients" ("notification_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_dc5211d456f98a47de5e069f477" PRIMARY KEY ("notification_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_021580b5aa0ee301ee359752b4" ON "notification_recipients" ("notification_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3c1147687827d3dd27ebfb4a4a" ON "notification_recipients" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "notification_recipients" ADD CONSTRAINT "FK_021580b5aa0ee301ee359752b45" FOREIGN KEY ("notification_id") REFERENCES "notification"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "notification_recipients" ADD CONSTRAINT "FK_3c1147687827d3dd27ebfb4a4af" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification_recipients" DROP CONSTRAINT "FK_3c1147687827d3dd27ebfb4a4af"`);
        await queryRunner.query(`ALTER TABLE "notification_recipients" DROP CONSTRAINT "FK_021580b5aa0ee301ee359752b45"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c1147687827d3dd27ebfb4a4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_021580b5aa0ee301ee359752b4"`);
        await queryRunner.query(`DROP TABLE "notification_recipients"`);
        await queryRunner.query(`DROP TABLE "notification"`);
    }

}
