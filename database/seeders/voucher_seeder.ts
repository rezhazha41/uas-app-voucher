import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Voucher from '#models/voucher'

export default class VoucherSeeder extends BaseSeeder {
  async run() {
    await Voucher.createMany([
      {
        name: 'Voucher Pulsa',
        description: 'Diskon untuk semua operator',
      },
      {
        name: 'Voucher Paket Data',
        description: 'Paket internet hemat',
      },
      {
        name: 'Diskon Belanja',
        description: 'Voucher diskon Alfamart, Indomaret, dll',
      },
      {
        name: 'Token Listrik',
        description: 'Token PLN prabayar',
      },
    ])
  }
}
