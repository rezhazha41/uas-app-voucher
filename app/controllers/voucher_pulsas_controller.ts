import type { HttpContext } from '@adonisjs/core/http'
import VoucherPulsa from '#models/voucher_pulsa'
import { nanoid } from 'nanoid'

export default class VoucherPulsasController {
  async index({ view }: HttpContext) {
    const vouchers = await VoucherPulsa.all()
    return view.render('pages/admin/voucher_pulsa/index', { vouchers })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/admin/voucher_pulsa/create')
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['provider', 'nominal', 'price', 'description', 'expired_at'])
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const kode_voucher = `VC-${nanoid(6).toUpperCase()}`
    await VoucherPulsa.create({
      ...data,
      kode_voucher, // ⬅️ disisipkan di sini
    })
    return response.redirect().toRoute('admin.voucher_pulsa.index')
  }

  async edit({ params, view }: HttpContext) {
    const voucher = await VoucherPulsa.findOrFail(params.id)
    return view.render('pages/admin/voucher_pulsa/edit', { voucher })
  }

  async update({ params, request, response }: HttpContext) {
    const voucher = await VoucherPulsa.findOrFail(params.id)
    const data = request.only(['provider', 'nominal', 'price', 'description', 'expired_at'])
    voucher.merge(data)
    await voucher.save()
    return response.redirect().toRoute('admin.voucher_pulsa.index')
  }

  async destroy({ params, response }: HttpContext) {
    const voucher = await VoucherPulsa.findOrFail(params.id)
    await voucher.delete()
    return response.status(200).send('deleted')
  }
}
