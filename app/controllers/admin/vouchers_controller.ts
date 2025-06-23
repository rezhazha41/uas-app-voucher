import type { HttpContext } from '@adonisjs/core/http'
import Voucher from '#models/voucher'

export default class VouchersController {
  async index({ view }: HttpContext) {
    const vouchers = await Voucher.all()
    return view.render('pages/admin/vouchers/index', { vouchers })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/admin/vouchers/create')
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'description'])
    await Voucher.create(data)
    return response.redirect().toRoute('admin.vouchers.index')
  }

  async edit({ params, view }: HttpContext) {
    const voucher = await Voucher.findOrFail(params.id)
    return view.render('pages/admin/vouchers/edit', { voucher })
  }

  async update({ params, request, response }: HttpContext) {
    const voucher = await Voucher.findOrFail(params.id)
    voucher.merge(request.only(['name', 'description']))
    await voucher.save()
    return response.redirect().toRoute('admin.vouchers.index')
  }

  async destroy({ params, response }: HttpContext) {
    console.log('Menghapus voucher ID:', params.id) //
    const voucher = await Voucher.findOrFail(params.id)
    await voucher.delete()
    return response.redirect().toRoute('admin.vouchers.index')
  }
}
