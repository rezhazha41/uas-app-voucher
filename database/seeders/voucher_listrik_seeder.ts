import VoucherListrik from '#models/voucher_listrik'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890ABCDEFGHJKLMNPQRSTUVWXYZ', 12)

export default class extends BaseSeeder {
  async run() {
    await VoucherListrik.createMany([
      {
        provider: 'PLN',
        nominal: '100.000',
        price: 95000,
        description: 'Token listrik nominal 100 ribu',
        kode_voucher: nanoid(),
        is_sold: false,
        user_id: null,
        expired_at: DateTime.now().plus({ days: 30 }),
      },
      {
        provider: 'PLN',
        nominal: '50.000',
        price: 48000,
        description: 'Token listrik nominal 50 ribu',
        kode_voucher: nanoid(),
        is_sold: false,
        user_id: null,
        expired_at: DateTime.now().plus({ days: 30 }),
      },
    ])
  }
}
