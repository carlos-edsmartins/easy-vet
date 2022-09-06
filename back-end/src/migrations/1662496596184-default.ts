import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1662496596184 implements MigrationInterface {
    name = 'default1662496596184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "pet" ADD "type" character varying NOT NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "pet" ADD "size" character varying NOT NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "consultation" ADD "date" TIMESTAMP NOT NULL`
        )
        await queryRunner.query(
            `ALTER TABLE "consultation" ADD "description" character varying NOT NULL`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "consultation" DROP COLUMN "description"`
        )
        await queryRunner.query(`ALTER TABLE "consultation" DROP COLUMN "date"`)
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "size"`)
        await queryRunner.query(`ALTER TABLE "pet" DROP COLUMN "type"`)
    }
}
