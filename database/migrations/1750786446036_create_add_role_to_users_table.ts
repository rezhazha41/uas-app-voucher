import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddRoleToUsers extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.string('role').notNullable().defaultTo('client')
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('role')
    })
  }
}
