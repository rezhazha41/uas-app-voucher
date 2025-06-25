import { BaseSeeder } from '@adonisjs/lucid/seeders'
import VoucherDiskon from '#models/voucher_diskon'
import { nanoid } from 'nanoid'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await VoucherDiskon.createMany([
      {
        nama: 'Diskon Belanja Shopee 10RB',
        merchant: 'Shopee',
        description: 'Diskon Rp10.000 untuk semua produk minimal belanja Rp50.000',
        nominal: 10000,
        price: 5000,
        kode_voucher: nanoid(10),
        expired_at: DateTime.now().plus({ days: 30 }),
        is_sold: false,
      },
      {
        nama: 'Diskon Gojek 15RB',
        merchant: 'Gojek',
        description: 'Voucher diskon Rp15.000 untuk layanan GoFood min pembelian Rp60.000',
        nominal: 15000,
        price: 8000,
        kode_voucher: nanoid(10),
        expired_at: DateTime.now().plus({ days: 30 }),
        is_sold: false,
      },
    ])
  }
}
