// database/migrations/xxx_voucher_pulsas.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'voucher_pulsas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('provider').notNullable()
      table.integer('nominal').notNullable()
      table.decimal('harga', 10, 2).notNullable()
      table.string('kode_voucher').notNullable()
      table.timestamp('expired_at').nullable()
      table.decimal('size_gb', 5, 2).nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
