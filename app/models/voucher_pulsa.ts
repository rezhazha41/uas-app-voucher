import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

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

  @column.dateTime()
  expired_at?: DateTime

  @column.dateTime({ autoCreate: true })
  createdAt: DateTime | undefined

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  updatedAt: DateTime | undefined
}
