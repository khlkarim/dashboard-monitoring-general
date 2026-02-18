import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOnDeleteCascadeInManyToManyRelationships1771353902137 implements MigrationInterface {
    name = 'AddOnDeleteCascadeInManyToManyRelationships1771353902137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_skill" DROP CONSTRAINT "FK_49db81d31fc330a905af3c01205"`);
        await queryRunner.query(`ALTER TABLE "user_skill" ADD CONSTRAINT "FK_49db81d31fc330a905af3c01205" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_skill" DROP CONSTRAINT "FK_49db81d31fc330a905af3c01205"`);
        await queryRunner.query(`ALTER TABLE "user_skill" ADD CONSTRAINT "FK_49db81d31fc330a905af3c01205" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
