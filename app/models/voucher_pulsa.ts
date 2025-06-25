import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class VoucherPulsa extends BaseModel {
  @column({ isPrimary: true })
  id: number | undefined

  @column()
  provider: string | undefined

  @column()
  nominal: string | undefined

  @column()
  price: number | undefined

  @column()
  description?: string

  @column()
  kode_voucher?: string

  @column()
  is_sold: boolean | undefined

  @column.dateTime()
  expired_at?: DateTime

  @column.dateTime({ autoCreate: true })
  createdAt: DateTime | undefined

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  updatedAt: DateTime | undefined

  @belongsTo(() => User)
  user!: BelongsTo<typeof User>

  @column()
  user_id: number | undefined
}
