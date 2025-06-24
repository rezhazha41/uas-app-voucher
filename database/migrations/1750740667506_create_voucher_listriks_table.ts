import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateVoucherListriks extends BaseSchema {
  protected tableName = 'voucher_listriks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nominal').notNullable() // Misal: "20.000"
      table.decimal('price', 10, 2).notNullable()
      table.string('kode_token').notNullable().unique() // Token unik listrik
      table.string('description').nullable()
      table.timestamp('expired_at').nullable()
      table.boolean('is_sold').notNullable().defaultTo(false)
      table.integer('user_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
