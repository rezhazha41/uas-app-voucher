import type { HttpContext } from '@adonisjs/core/http'
import VoucherData from '#models/voucher_data'
import { nanoid } from 'nanoid'

export default class VoucherDatasController {
  async index({ view }: HttpContext) {
    const vouchers = await VoucherData.all()
    return view.render('pages/admin/voucher_data/index', { vouchers })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/admin/voucher_data/create')
  }
async store({ request, response }: HttpContext) {
  const raw = request.only(['provider', 'price', 'nominal', 'description', 'expired_at'])

  await VoucherData.create({
    provider: raw.provider,
    price: raw.price,
    nominal: raw.nominal, // ← dipetakan ke kolom 'nominal'
    description: raw.description,
    expired_at: raw.expired_at,
    kode_voucher: `VD-${nanoid(6).toUpperCase()}`,
    is_sold: false,
  })

  return response.redirect().toRoute('admin.voucher_data.index')
}

  async edit({ params, view }: HttpContext) {
    const voucher = await VoucherData.findOrFail(params.id)
    return view.render('pages/admin/voucher_data/edit', { voucher })
  }

async update({ params, request, response }: HttpContext) {
  const voucher = await VoucherData.findOrFail(params.id)
  const raw = request.only(['provider', 'price', 'nominal', 'description', 'expired_at'])

  voucher.merge({
    provider: raw.provider,
    price: raw.price,
    nominal: raw.nominal,
    description: raw.description,
    expired_at: raw.expired_at,
  })

  await voucher.save()
  return response.redirect().toRoute('admin.voucher_data.index')
}


  async destroy({ params, response }: HttpContext) {
    const voucher = await VoucherData.findOrFail(params.id)
    await voucher.delete()
    return response.redirect().toRoute('admin.voucher_data.index')
  }
}