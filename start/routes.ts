//start/routes.ts
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const LogoutController = () => import('#controllers/auth/logout_controller')
// Update the import path below if your controllers are located elsewhere
const LoginController = () => import('#controllers/auth/login_controller')
import User from '#models/user'
import router from '@adonisjs/core/services/router'
const RegisterController = () => import('../app/controllers/auth/registers_controller.js')

router.get('/', async (ctx) => {
  await ctx.auth.check()
  return ctx.view.render('pages/home')
})

router
  .group(() => {
    router.get('/register', [RegisterController, 'show']).as('register.show')
    router.post('/register', [RegisterController, 'store']).as('register.store')

    router.get('/login', [LoginController, 'show']).as('login.show')
    router.post('/login', [LoginController, 'store']).as('login.store')

    router.post('/logout', [LogoutController, 'handle']).as('logout')
  })
  .as('auth')
router
  .get('/admin/login', async ({ view }) => {
    return view.render('pages/admin/login')
  })
  .as('admin.login.show')

router
  .post('/admin/login', async ({ request, response, auth, session }) => {
    const { email, password } = request.only(['email', 'password'])

    if (email !== 'admin@voucherku.com') {
      session.flash('errors', { E_INVALID_CREDENTIALS: 'Bukan akun admin.' })
      return response.redirect().toRoute('admin.login.show')
    }

    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    return response.redirect('/admin/dashboard')
  })
  .as('admin.login')
router
  .get('/admin/dashboard', async ({ auth, response, view }) => {
    if (!auth.user || auth.user.email !== 'admin@voucherku.com') {
      return response.unauthorized('Hanya admin yang bisa mengakses ini.')
    }

    return view.render('pages/admin/dashboard')
  })
  .as('admin.dashboard')
