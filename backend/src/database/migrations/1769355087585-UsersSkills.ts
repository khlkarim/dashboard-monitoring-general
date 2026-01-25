import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersSkills1769355087585 implements MigrationInterface {
    name = 'UsersSkills1769355087585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skill" ("description" character varying, "title" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_skill" ("userId" uuid NOT NULL, "skillId" uuid NOT NULL, CONSTRAINT "PK_ad35af7f2b556d0b9a67af8db8b" PRIMARY KEY ("userId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_03260daf2df95f4492cc8eb00e" ON "user_skill" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_49db81d31fc330a905af3c0120" ON "user_skill" ("skillId") `);
        await queryRunner.query(`ALTER TABLE "user_skill" ADD CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_skill" ADD CONSTRAINT "FK_49db81d31fc330a905af3c01205" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_skill" DROP CONSTRAINT "FK_49db81d31fc330a905af3c01205"`);
        await queryRunner.query(`ALTER TABLE "user_skill" DROP CONSTRAINT "FK_03260daf2df95f4492cc8eb00e6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_49db81d31fc330a905af3c0120"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_03260daf2df95f4492cc8eb00e"`);
        await queryRunner.query(`DROP TABLE "user_skill"`);
        await queryRunner.query(`DROP TABLE "skill"`);
    }

}
