import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'voucher_pulsas'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('expired_at').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('expired_at')
    })
  }
}
