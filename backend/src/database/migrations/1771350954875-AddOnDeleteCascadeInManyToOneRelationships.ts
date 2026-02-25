import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOnDeleteCascadeInManyToOneRelationships1771350954875 implements MigrationInterface {
    name = 'AddOnDeleteCascadeInManyToOneRelationships1771350954875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_7384988f7eeb777e44802a0baca"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d7263b567c2d0945fd5aa9ab671"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_5ad8a047b8f023bf36b2a232a42"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_4d1f6abd26e04b838bdfdaa2145"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP CONSTRAINT "FK_dd5b68b51d3d7afe01be3970cd5"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP CONSTRAINT "FK_23d8b18820ebade3c38911c08d2"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP CONSTRAINT "FK_f063a85096c1cca8dcfaf76a016"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_5e5061612cdc355e865059caf42"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_d7263b567c2d0945fd5aa9ab671" FOREIGN KEY ("reporterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_7384988f7eeb777e44802a0baca" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_5ad8a047b8f023bf36b2a232a42" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_4d1f6abd26e04b838bdfdaa2145" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD CONSTRAINT "FK_23d8b18820ebade3c38911c08d2" FOREIGN KEY ("processusId") REFERENCES "processus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD CONSTRAINT "FK_f063a85096c1cca8dcfaf76a016" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD CONSTRAINT "FK_dd5b68b51d3d7afe01be3970cd5" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_5e5061612cdc355e865059caf42" FOREIGN KEY ("processusId") REFERENCES "processus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_5e5061612cdc355e865059caf42"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP CONSTRAINT "FK_dd5b68b51d3d7afe01be3970cd5"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP CONSTRAINT "FK_f063a85096c1cca8dcfaf76a016"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP CONSTRAINT "FK_23d8b18820ebade3c38911c08d2"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_4d1f6abd26e04b838bdfdaa2145"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_5ad8a047b8f023bf36b2a232a42"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_7384988f7eeb777e44802a0baca"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d7263b567c2d0945fd5aa9ab671"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_5e5061612cdc355e865059caf42" FOREIGN KEY ("processusId") REFERENCES "processus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD CONSTRAINT "FK_f063a85096c1cca8dcfaf76a016" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD CONSTRAINT "FK_23d8b18820ebade3c38911c08d2" FOREIGN KEY ("processusId") REFERENCES "processus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD CONSTRAINT "FK_dd5b68b51d3d7afe01be3970cd5" FOREIGN KEY ("managerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_4d1f6abd26e04b838bdfdaa2145" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_5ad8a047b8f023bf36b2a232a42" FOREIGN KEY ("sprintId") REFERENCES "sprint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_d7263b567c2d0945fd5aa9ab671" FOREIGN KEY ("reporterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_7384988f7eeb777e44802a0baca" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
