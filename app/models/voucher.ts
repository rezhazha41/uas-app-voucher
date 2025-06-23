import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

/**
 * Voucher Model
 * Represents a voucher in the system.
 *
 * @module Voucher
 */
/**
 * @class Voucher
 * @extends BaseModel
 * @description This model represents a voucher with fields for name, description, and timestamps.
 */
export default class Voucher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
