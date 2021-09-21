import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInterestBooks1632135327697 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_booksInterest_books",
        columns: [
          {
            name: "usersId",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "booksId",
            type: "uuid",
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["usersId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
          },
          {
            columnNames: ["booksId"],
            referencedColumnNames: ["id"],
            referencedTableName: "books",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_booksInterest_books");
  }
}
