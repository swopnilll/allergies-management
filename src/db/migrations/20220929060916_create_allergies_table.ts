import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("allergies", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("severity");
    table.boolean("is_deleted");
    table.boolean("is_high_risk");
    table.text("symtoms");
    table.integer("user_id");
    table
    .foreign("user_id")
    .references("id")
    .inTable("users")
    .onDelete("SET NULL");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("allergies");
}
