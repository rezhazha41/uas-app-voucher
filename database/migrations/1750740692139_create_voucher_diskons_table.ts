import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'voucher_diskons'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama').notNullable()
      table.string('merchant').notNullable()
      table.text('description').nullable()
      table.integer('nominal').notNullable()
      table.integer('price').notNullable()
      table.string('kode_voucher').notNullable().unique()
      table.boolean('is_sold').notNullable().defaultTo(false)
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL')
      table.timestamp('expired_at', { useTz: true })
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
