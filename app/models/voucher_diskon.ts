import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class VoucherDiskon extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare merchant: string

  @column()
  declare description: string

  @column()
  declare nominal: number

  @column()
  declare price: number

  @column()
  declare kode_voucher: string

  @column()
  declare is_sold: boolean

  @column()
  declare user_id: number

  @belongsTo(() => User)
  user!: BelongsTo<typeof User>

  @column.dateTime()
  declare expired_at: DateTime

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
}
