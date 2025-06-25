// database/migrations/xxx_voucher_pulsas.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'voucher_pulsas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('provider').notNullable()
      table.string('nominal').notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.string('description').nullable()
      table.string('kode_voucher').notNullable()
      table.timestamp('expired_at').nullable()
      table.boolean('is_sold').notNullable().defaultTo(false)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
