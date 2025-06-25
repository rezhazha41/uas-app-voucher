import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

export default class AuthMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    const { request, response, auth } = ctx

    try {
      await auth.authenticateUsing(options.guards)
      return next()
    } catch {
      // Cek apakah URL-nya prefix admin
      const isAdminArea = request.url().startsWith('/admin')

      return response.redirect(isAdminArea ? '/admin/login' : '/login')
    }
  }
}
