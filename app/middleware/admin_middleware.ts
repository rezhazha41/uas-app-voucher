import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    // Pastikan user login dan punya role 'admin'
    if (!auth.user || auth.user.role !== 'admin') {
      return response.unauthorized('Akses ditolak. Anda bukan admin.')
    }

    await next()
  }
}
