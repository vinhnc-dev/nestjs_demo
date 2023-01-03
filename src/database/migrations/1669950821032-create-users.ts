import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1669950821032 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    isNullable: false,
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    isNullable: false,
                    name: 'name',
                    type: 'varchar(60)',
                },
                {
                    isNullable: false,
                    name: 'email',
                    type: 'varchar(60)',
                    isUnique: true,
                },
                {
                    isNullable: false,
                    name: 'password',
                    type: 'varchar(60)',
                },
                {
                    isNullable: false,
                    name: 'phone',
                    type: 'varchar(15)',
                    isUnique: true,
                },
                {
                    isNullable: false,
                    name: 'role',
                    type: 'enum',
                    enum: ['admin', 'user'],
                },
                {
                    isNullable: false,
                    name: 'active',
                    type: 'enum',
                    enum: ['true', 'false'],
                },
                {
                    isNullable: true,
                    name: 'avatar',
                    type: 'varchar(260)',
                },
                {
                    name: 'created_at',
                    type: 'datetime(6)',
                    default: 'CURRENT_TIMESTAMP(6)',
                    isNullable: false,
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
