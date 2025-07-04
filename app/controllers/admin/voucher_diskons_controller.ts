import type { HttpContext } from '@adonisjs/core/http'
import VoucherDiskon from '#models/voucher_diskon'
import { nanoid } from 'nanoid'

export default class VoucherDiskonsController {
  async index({ view }: HttpContext) {
    const data = await VoucherDiskon.all()
    return view.render('pages/admin/voucher_diskon/index', { data })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/admin/voucher_diskon/create')
  }

  async store({ request, response }: HttpContext) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { nama, merchant, nominal, price, description, expired_at } = request.only([
      'nama',
      'merchant',
      'nominal',
      'price',
      'description',
      'expired_at',
    ])

    await VoucherDiskon.create({
      nama,
      merchant,
      nominal,
      price,
      description,
      expired_at,
      kode_voucher: `VDISK-${nanoid(6).toUpperCase()}`,
    })

    return response.redirect().toRoute('admin.voucher_diskon.index')
  }

  async edit({ params, view }: HttpContext) {
    const voucher = await VoucherDiskon.findOrFail(params.id)
    return view.render('pages/admin/voucher_diskon/edit', { data: voucher })
  }

  async update({ params, request, response }: HttpContext) {
    const voucher = await VoucherDiskon.findOrFail(params.id)
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { nama, merchant, nominal, price, description, expired_at } = request.only([
      'nama',
      'merchant',
      'nominal',
      'price',
      'description',
      'expired_at',
    ])

    voucher.merge({ nama, merchant, nominal, price, description, expired_at })
    await voucher.save()

    return response.redirect().toRoute('admin.voucher_diskon.index')
  }

  async destroy({ params, response }: HttpContext) {
    const voucher = await VoucherDiskon.findOrFail(params.id)
    await voucher.delete()

    return response.ok({ message: 'Berhasil dihapus' })
  }
}
