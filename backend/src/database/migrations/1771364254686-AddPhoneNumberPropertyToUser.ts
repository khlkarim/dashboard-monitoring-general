import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneNumberPropertyToUser1771364254686 implements MigrationInterface {
    name = 'AddPhoneNumberPropertyToUser1771364254686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" DROP CONSTRAINT "FK_2c0d4f18e4f839adfccc1f09a15"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "action" ADD CONSTRAINT "FK_2c0d4f18e4f839adfccc1f09a15" FOREIGN KEY ("riskId") REFERENCES "risk"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" DROP CONSTRAINT "FK_2c0d4f18e4f839adfccc1f09a15"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "action" ADD CONSTRAINT "FK_2c0d4f18e4f839adfccc1f09a15" FOREIGN KEY ("riskId") REFERENCES "risk"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
