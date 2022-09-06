import { MigrationInterface, QueryRunner } from 'typeorm'

export class default1662496149825 implements MigrationInterface {
    name = 'default1662496149825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "vet" ADD "price" integer NOT NULL`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vet" DROP COLUMN "price"`)
    }
}
