// app/controllers/riwayat_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import VoucherPulsa from '#models/voucher_pulsa'
import VoucherData from '#models/voucher_data'
import VoucherDiskon from '#models/voucher_diskon'
import VoucherListrik from '#models/voucher_listrik'

export default class RiwayatController {
  async index({ auth, view }: HttpContext) {
    const user = auth.user!

    const pulsa = await VoucherPulsa.query().where('user_id', user.id).where('is_sold', true)
    const data = await VoucherData.query().where('user_id', user.id).where('is_sold', true)
    const diskon = await VoucherDiskon.query().where('user_id', user.id).where('is_sold', true)
    const listrik = await VoucherListrik.query().where('user_id', user.id).where('is_sold', true)

    // Tambahkan properti jenis agar mudah dibedakan
    const all = [
      ...pulsa.map((v) => ({ ...v.serialize(), jenis: 'Pulsa', kode_voucher: v.kode_voucher })),
      ...data.map((v) => ({ ...v.serialize(), jenis: 'Data', kode_voucher: v.kode_voucher })),
      ...diskon.map((v) => ({ ...v.serialize(), jenis: 'Diskon', kode_voucher: v.kode_voucher })),
      ...listrik.map((v) => ({ ...v.serialize(), jenis: 'Listrik', kode_voucher: v.kode_voucher })),
    ]

    return view.render('pages/client/riwayat', { vouchers: all }) // ✅ pastikan key-nya "vouchers"
  }
}
