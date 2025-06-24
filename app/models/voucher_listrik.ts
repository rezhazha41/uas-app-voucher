import { BaseModel, column, beforeCreate } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'

export default class VoucherListrik extends BaseModel {
  public static table = 'voucher_listriks'

  @column({ isPrimary: true })
  public id: number | undefined

  @column()
  public nominal: string | undefined

  @column()
  public price: number | undefined

  @column()
  public kode_token: string | undefined

  @column()
  public description?: string

  @column.dateTime()
  public expired_at?: DateTime

  @column()
  public is_sold: boolean | undefined

  @column()
  public user_id?: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime | undefined

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
    /** Generate kode token otomatis sebelum create */
    | undefined

  /** Generate kode token otomatis sebelum create */
  @beforeCreate()
  public static async generateToken(voucher: VoucherListrik) {
    voucher.kode_token = `TOKEN-${nanoid(10).toUpperCase()}`
  }
}
