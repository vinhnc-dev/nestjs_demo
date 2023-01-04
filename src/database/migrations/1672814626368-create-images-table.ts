import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createImagesTable1672814626368 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
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
            name: 'filename',
            type: 'varchar(260)',
          },
          {
            isNullable: false,
            name: 'originalname',
            type: 'varchar(260)',
          },
          {
            isNullable: false,
            name: 'path',
            type: 'varchar(260)',
          },
          {
            isNullable: false,
            name: 'size',
            type: 'int',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
