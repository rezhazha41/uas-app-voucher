import { BaseSeeder } from '@adonisjs/lucid/seeders'
import VoucherDatas from '#models/voucher_data'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'

export default class VoucherDataSeeder extends BaseSeeder {
  async run() {
    const providers = ['Telkomsel', 'Indosat', 'XL', 'Axis', 'Tri']
    const sizeList = ['1GB', '2GB', '5GB', '10GB', '15GB']

    await VoucherDatas.createMany(
      Array.from({ length: 10 }, (_, i) => ({
        provider: providers[i % providers.length],
        nominal: sizeList[i % sizeList.length],
        price: (i + 1) * 10000,
        description: `Voucher data ${providers[i % providers.length]} ${sizeList[i % sizeList.length]}`,
        kode_voucher: `DATA-${nanoid(8).toUpperCase()}`,
        is_sold: false,
        expired_at: DateTime.now().plus({ days: 30 + i }),
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      }))
    )
  }
}
