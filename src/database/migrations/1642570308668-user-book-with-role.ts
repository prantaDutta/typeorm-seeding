import {MigrationInterface, QueryRunner} from "typeorm";

export class userBookWithRole1642570308668 implements MigrationInterface {
    name = 'userBookWithRole1642570308668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('User', 'Admin', 'Author', 'Librarian')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'User', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "uniqueBookId" character varying NOT NULL, "title" character varying NOT NULL, "desc" character varying NOT NULL, "rating" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_authors_user" ("bookId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_977cc65b1d1089769fb370a22f9" PRIMARY KEY ("bookId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7775ae6ef3e1a4e3c1e391e795" ON "book_authors_user" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bce11c9e74388ee6e509a8411a" ON "book_authors_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "book_authors_user" ADD CONSTRAINT "FK_7775ae6ef3e1a4e3c1e391e7959" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_authors_user" ADD CONSTRAINT "FK_bce11c9e74388ee6e509a8411a7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_authors_user" DROP CONSTRAINT "FK_bce11c9e74388ee6e509a8411a7"`);
        await queryRunner.query(`ALTER TABLE "book_authors_user" DROP CONSTRAINT "FK_7775ae6ef3e1a4e3c1e391e7959"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bce11c9e74388ee6e509a8411a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7775ae6ef3e1a4e3c1e391e795"`);
        await queryRunner.query(`DROP TABLE "book_authors_user"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
