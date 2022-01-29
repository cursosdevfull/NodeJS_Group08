import { MigrationInterface, QueryRunner } from "typeorm";

export class refactor1643469170202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table user CHANGE COLUMN name firstname VARCHAR(255) NOT NULL;`
    );

    /*  await queryRunner.query(`
    DELIMITER $$
        CREATE PROCEDURE listOfCars2(
            in idCar int
        )
        BEGIN
            select * from car where id = idCar;
        END$$
        DELIMITER ;
    `); */
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table user CHANGE COLUMN firstname name VARCHAR(255) NOT NULL;`
    );
  }
}
