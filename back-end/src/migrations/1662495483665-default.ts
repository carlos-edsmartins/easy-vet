import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1662495483665 implements MigrationInterface {
    name = 'default1662495483665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "pet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "age" integer NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "vet" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "crmv" character varying NOT NULL, "specialization" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_98679c20fcaf20547fe9cacdf4d" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `CREATE TABLE "consultation" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "statusId" integer, "userId" integer, "petId" integer, "vetId" integer, CONSTRAINT "PK_5203569fac28a4a626c42abe70b" PRIMARY KEY ("id"))`
        )
        await queryRunner.query(
            `ALTER TABLE "pet" ADD CONSTRAINT "FK_4eb3b1eeefc7cdeae09f934f479" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "consultation" ADD CONSTRAINT "FK_5cc48f484b6867a65d24aeda41f" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "consultation" ADD CONSTRAINT "FK_5fdef95bb1290b8daff57fa3b4b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "consultation" ADD CONSTRAINT "FK_944d73fc7852c71871fffd10f36" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
        await queryRunner.query(
            `ALTER TABLE "consultation" ADD CONSTRAINT "FK_2b3b23ddf61f4b71543daf04ef3" FOREIGN KEY ("vetId") REFERENCES "vet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "consultation" DROP CONSTRAINT "FK_2b3b23ddf61f4b71543daf04ef3"`
        )
        await queryRunner.query(
            `ALTER TABLE "consultation" DROP CONSTRAINT "FK_944d73fc7852c71871fffd10f36"`
        )
        await queryRunner.query(
            `ALTER TABLE "consultation" DROP CONSTRAINT "FK_5fdef95bb1290b8daff57fa3b4b"`
        )
        await queryRunner.query(
            `ALTER TABLE "consultation" DROP CONSTRAINT "FK_5cc48f484b6867a65d24aeda41f"`
        )
        await queryRunner.query(
            `ALTER TABLE "pet" DROP CONSTRAINT "FK_4eb3b1eeefc7cdeae09f934f479"`
        )
        await queryRunner.query(`DROP TABLE "consultation"`)
        await queryRunner.query(`DROP TABLE "vet"`)
        await queryRunner.query(`DROP TABLE "pet"`)
        await queryRunner.query(`DROP TABLE "user"`)
        await queryRunner.query(`DROP TABLE "status"`)
    }
}
