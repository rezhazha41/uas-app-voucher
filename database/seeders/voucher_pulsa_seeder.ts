import { DateTime } from 'luxon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import VoucherPulsa from '#models/voucher_pulsa'

export default class extends BaseSeeder {
  async run () {
    await VoucherPulsa.createMany([
      {
        provider: 'Telkomsel',
        nominal: '10GB',
        price: 10000,
        kode_voucher: 'TS-10GB-001',
        description: 'Voucher Telkomsel 10GB',
        expired_at: DateTime.fromISO('2025-12-31'),
      },
      {
        provider: 'XL',
        nominal: '5GB',
        price: 5000,
        kode_voucher: 'XL-5GB-001',
        description: 'Voucher XL 5GB',
        expired_at: DateTime.fromISO('2025-12-01'),
      }
    ])
  }
}
