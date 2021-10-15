import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addColumnUploadImages1634293269237 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "avatar",
        type: "varchar",
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      "books",
      new TableColumn({
        name: "bookCover",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "avatar");

    await queryRunner.dropColumn("books", "bookCover");
  }
}
