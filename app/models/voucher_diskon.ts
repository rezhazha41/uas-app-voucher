// app/models/voucher_diskon.ts

import { BaseModel, column, } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class VoucherDiskon extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare merchant: string

  @column()
  declare nominal: string

  @column()
  declare price: number

  @column()
  declare kode_voucher: string

  @column()
  declare description?: string

  @column.dateTime()
  declare expired_at: DateTime | null

  @column()
  declare is_sold: boolean

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime
  user_id: number | undefined
}
