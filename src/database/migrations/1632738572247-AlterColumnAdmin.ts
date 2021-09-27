import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterColumnAdmin1632738572247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "admin",
      new TableColumn({
        name: "admin",
        type: "boolean",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "users",
      "admin",
      new TableColumn({
        name: "admin",
        type: "boolean",
      })
    );
  }
}
