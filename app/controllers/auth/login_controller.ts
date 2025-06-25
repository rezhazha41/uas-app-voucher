//app/controllers/auth/login_controller.ts
import User from '#models/user'
import { loginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async show({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    // Gunakan session.flash agar bisa muncul notifikasi di tampilan
    session.flash('success', `Halo ${user.fullName}, kamu berhasil login! 🎉`)

    return response.redirect().toPath('/')
  }
}
