import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_allergy", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table
    .foreign("user_id")
    .references("id")
    .inTable("users")
    .onDelete("SET NULL");
    table.integer("allergy_id").unsigned().notNullable();
    table
      .foreign("allergy_id")
      .references("id")
      .inTable("allergies")
      .onDelete("SET NULL");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_allergy");
}
