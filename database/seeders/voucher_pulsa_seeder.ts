import { DateTime } from 'luxon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import VoucherPulsa from '#models/voucher_pulsa'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890ABCDEFGHJKLMNPQRSTUVWXYZ', 10)

export default class extends BaseSeeder {
  async run() {
    await VoucherPulsa.createMany([
      {
        provider: 'Telkomsel',
        nominal: '10GB',
        price: 10000,
        kode_voucher: 'TS-' + nanoid(),
        description: 'Voucher Telkomsel 10GB',
        expired_at: DateTime.fromISO('2025-12-31'),
      },
      {
        provider: 'XL',
        nominal: '5GB',
        price: 5000,
        kode_voucher: 'XL-' + nanoid(),
        description: 'Voucher XL 5GB',
        expired_at: DateTime.fromISO('2025-12-01'),
      },
      {
        provider: 'Indosat',
        nominal: '15GB',
        price: 12000,
        kode_voucher: 'IM3-' + nanoid(),
        description: 'Voucher Indosat 15GB berlaku 7 hari',
        expired_at: DateTime.now().plus({ days: 30 }),
      },
      {
        provider: 'Axis',
        nominal: '2GB',
        price: 3000,
        kode_voucher: 'AX-' + nanoid(),
        description: 'Paket hemat Axis 2GB',
        expired_at: DateTime.now().plus({ days: 15 }),
      },
      {
        provider: 'Telkomsel',
        nominal: '25GB',
        price: 22000,
        kode_voucher: 'TS-' + nanoid(),
        description: 'Kuota besar untuk streaming dan belajar',
        expired_at: DateTime.now().plus({ days: 45 }),
      },
      {
        provider: 'XL',
        nominal: '20GB',
        price: 18000,
        kode_voucher: 'XL-' + nanoid(),
        description: 'Internet XL 20GB, aktif 30 hari',
        expired_at: DateTime.now().plus({ days: 60 }),
      },
      {
        provider: 'Three',
        nominal: '3GB',
        price: 4000,
        kode_voucher: '3-' + nanoid(),
        description: 'Voucher Tri 3GB berlaku 5 hari',
        expired_at: DateTime.now().plus({ days: 10 }),
      },
      {
        provider: 'Axis',
        nominal: '10GB',
        price: 9000,
        kode_voucher: 'AX-' + nanoid(),
        description: 'Axis Bronet 10GB 24 Jam',
        expired_at: DateTime.now().plus({ days: 35 }),
      },
      {
        provider: 'Indosat',
        nominal: '5GB',
        price: 4500,
        kode_voucher: 'IM3-' + nanoid(),
        description: 'Indosat Freedom 5GB',
        expired_at: DateTime.now().plus({ days: 20 }),
      },
      {
        provider: 'Telkomsel',
        nominal: '1GB',
        price: 1500,
        kode_voucher: 'TS-' + nanoid(),
        description: 'Telkomsel 1GB untuk darurat',
        expired_at: DateTime.now().plus({ days: 7 }),
      },
      {
        provider: 'XL',
        nominal: '40GB',
        price: 35000,
        kode_voucher: 'XL-' + nanoid(),
        description: 'XL Xtra Combo 40GB',
        expired_at: DateTime.now().plus({ days: 75 }),
      },
      {
        provider: 'Three',
        nominal: '10GB',
        price: 8500,
        kode_voucher: '3-' + nanoid(),
        description: 'Tri Happy Plan 10GB',
        expired_at: DateTime.now().plus({ days: 30 }),
      },
      {
        provider: 'Smartfren',
        nominal: '15GB',
        price: 13000,
        kode_voucher: 'SF-' + nanoid(),
        description: 'Smartfren Unlimited Kuota 15GB',
        expired_at: DateTime.now().plus({ days: 50 }),
      },
      {
        provider: 'Smartfren',
        nominal: '5GB',
        price: 4500,
        kode_voucher: 'SF-' + nanoid(),
        description: 'Smartfren 5GB 24 Jam',
        expired_at: DateTime.now().plus({ days: 25 }),
      },
      {
        provider: 'Axis',
        nominal: '30GB',
        price: 28000,
        kode_voucher: 'AX-' + nanoid(),
        description: 'Axis OWSEM 30GB',
        expired_at: DateTime.now().plus({ days: 60 }),
      },
    ])
  }
}
