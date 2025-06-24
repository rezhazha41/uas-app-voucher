import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'voucher_diskons'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('merchant').notNullable() // Misal: Indomaret/Alfamart
      table.string('nominal').notNullable() // Contoh: Rp5.000 / 10%
      table.decimal('price', 10, 2).notNullable()
      table.string('kode_voucher').notNullable()
      table.string('description').nullable()
      table.timestamp('expired_at').nullable()
      table.boolean('is_sold').notNullable().defaultTo(false)
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
