import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('voucher_listriks', (table) => {
      table.increments('id')
      table.string('provider').notNullable()
      table.string('nominal').notNullable()
      table.integer('price').notNullable()
      table.string('description')
      table.string('kode_voucher').notNullable()
      table.boolean('is_sold').defaultTo(false)
      table.integer('user_id').unsigned().references('users.id').onDelete('SET NULL')
      table.timestamp('expired_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable('voucher_listriks')
  }
}
