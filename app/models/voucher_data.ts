import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class VoucherData extends BaseModel {
  static table = 'voucher_datas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare provider: string

  @column()
  declare nominal: string

  @column()
  declare price: number

  @column()
  declare description: string

  @column()
  declare kode_voucher: string

  @column()
  declare is_sold: boolean

  @column()
  declare user_id: number | null

  @column.dateTime()
  declare expired_at: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
