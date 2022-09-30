import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("symtoms", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.text("description");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("symtoms");
}
