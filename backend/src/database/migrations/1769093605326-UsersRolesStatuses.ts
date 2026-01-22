import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersRolesStatuses1769093605326 implements MigrationInterface {
    name = 'UsersRolesStatuses1769093605326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`);
        await queryRunner.query(`ALTER TABLE "status" DROP CONSTRAINT "PK_e12743a7086ec826733f54e1d95"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "status" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ADD CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP CONSTRAINT "FK_117defdaa57dcb42206cfdeb482"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_4d1f6abd26e04b838bdfdaa2145"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d7263b567c2d0945fd5aa9ab671"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_7384988f7eeb777e44802a0baca"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roleId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "statusId" character varying`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD "createdById" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "createdById" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "authorId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "authorId" uuid`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "reporterId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "reporterId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "assigneeId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "assigneeId" uuid NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "userId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD CONSTRAINT "FK_117defdaa57dcb42206cfdeb482" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_4d1f6abd26e04b838bdfdaa2145" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_d7263b567c2d0945fd5aa9ab671" FOREIGN KEY ("reporterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_7384988f7eeb777e44802a0baca" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_7384988f7eeb777e44802a0baca"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d7263b567c2d0945fd5aa9ab671"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP CONSTRAINT "FK_4d1f6abd26e04b838bdfdaa2145"`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP CONSTRAINT "FK_117defdaa57dcb42206cfdeb482"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "userId" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "assigneeId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "assigneeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "reporterId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "reporterId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "authorId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "sprint" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD "createdById" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "kpi" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD "createdById" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "statusId" integer`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roleId" integer`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_7384988f7eeb777e44802a0baca" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_d7263b567c2d0945fd5aa9ab671" FOREIGN KEY ("reporterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprint" ADD CONSTRAINT "FK_4d1f6abd26e04b838bdfdaa2145" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kpi" ADD CONSTRAINT "FK_117defdaa57dcb42206cfdeb482" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "status" DROP CONSTRAINT "PK_e12743a7086ec826733f54e1d95"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "status" ADD "id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ADD CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "role" ADD "id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
