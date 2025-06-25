import type { HttpContext } from '@adonisjs/core/http'
import VoucherListrik from '#models/voucher_listrik'
import { nanoid } from 'nanoid'

export default class VoucherListriksController {
  // Menampilkan semua voucher listrik
  async index({ view }: HttpContext) {
    const vouchers = await VoucherListrik.all()
    return view.render('pages/admin/voucher_listrik/index', { data: vouchers })
  }

  // Menampilkan form tambah voucher
  async create({ view }: HttpContext) {
    return view.render('pages/admin/voucher_listrik/create')
  }

  // Menyimpan data baru
  async store({ request, response }: HttpContext) {
    const data = request.only(['provider', 'nominal', 'price', 'description', 'expired_at'])

    await VoucherListrik.create({
      ...data,
      kode_voucher: `VL-${nanoid(6).toUpperCase()}`,
      is_sold: false,
    })

    return response.redirect().toRoute('admin.voucher_listrik.index')
  }

  // Menampilkan form edit
  async edit({ params, view }: HttpContext) {
    const voucher = await VoucherListrik.findOrFail(params.id)
    return view.render('pages/admin/voucher_listrik/edit', { data: voucher })
  }

  // Memperbarui data voucher
  async update({ params, request, response }: HttpContext) {
    const voucher = await VoucherListrik.findOrFail(params.id)
    const data = request.only(['nominal', 'price', 'description', 'expired_at'])

    voucher.merge(data)
    await voucher.save()

    return response.redirect().toRoute('admin.voucher_listrik.index')
  }

  // Menghapus voucher
  async destroy({ params, response }: HttpContext) {
    const voucher = await VoucherListrik.findOrFail(params.id)
    await voucher.delete()
    return response.ok({ message: 'Berhasil dihapus' })
  }
}
