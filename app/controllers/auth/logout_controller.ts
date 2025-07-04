//app/controllers/auth/logout_controller.ts
import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async handle({ response, auth }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect().toPath('/')
  }
}
