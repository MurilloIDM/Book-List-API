import { MigrationInterface, QueryRunner } from "typeorm";

export class ChargeTableNameRelations1632822897071
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable(
      "users_readBooks_books",
      "users_read_books_books"
    );

    await queryRunner.renameTable(
      "users_booksInterest_books",
      "users_books_interest_books"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable(
      "users_read_books_books",
      "users_readBooks_books"
    );

    await queryRunner.renameTable(
      "users_books_interest_books",
      "users_booksInterest_books"
    );
  }
}
