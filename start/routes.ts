/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
*/

import router from '@adonisjs/core/services/router'
import User from '#models/user'
const VoucherPulsasController = () => import('#controllers/voucher_pulsas_controller')
import { middleware } from './kernel.js'

// Auth Controller
const RegisterController = () => import('#controllers/auth/registers_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

// Admin Voucher Controller
const VouchersController = () => import('#controllers/admin/vouchers_controller')

/**
 * ============================
 * ROUTE UMUM (USER)
 * ============================
 */
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

/**
 * ============================
 * ROUTE ADMIN LOGIN
 * ============================
 * (Tanpa middleware, supaya admin bisa login)
 */
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

    return response.redirect().toRoute('admin.vouchers.dashboard')
  })
  .as('admin.login')

/**
 * ============================
 * ROUTE ADMIN VOUCHER (Kelola)
 * ============================
 * (Dengan middleware auth & admin)
 */
router
  .group(() => {
    // Dashboard
    router
      .get('/dashboard', async ({ view }) => {
        return view.render('pages/admin/dashboard')
      })
      .as('dashboard')

    // Daftar voucher
    router.get('/', [VouchersController, 'index']).as('index')

    // Form tambah voucher
    router.get('/create', [VouchersController, 'create']).as('create')

    // Simpan voucher baru
    router.post('/', [VouchersController, 'store']).as('store')

    // Form edit voucher
    router.get('/:id/edit', [VouchersController, 'edit']).as('edit')

    // Simpan perubahan voucher
    router.put('/:id', [VouchersController, 'update']).as('update')

    // Hapus voucher
    router.delete('/:id', [VouchersController, 'destroy']).as('destroy')
  })
  .prefix('/admin/vouchers')
  .as('admin.vouchers')

// halaman dashboard admin dan crud voucher pulsa
router
  .group(() => {
    router.get('/', [VoucherPulsasController, 'index']).as('index')
    router.get('/create', [VoucherPulsasController, 'create']).as('create')
    router.post('/', [VoucherPulsasController, 'store']).as('store')
    router.get('/:id/edit', [VoucherPulsasController, 'edit']).as('edit')
    router.put('/:id', [VoucherPulsasController, 'update']).as('update')
    router.delete('/:id', [VoucherPulsasController, 'destroy']).as('destroy')
  })
  .prefix('/admin/voucher_pulsa')
  .as('admin.voucher_pulsa')
  .middleware([middleware.auth(), middleware.admin()])
// Halaman daftar voucher pulsa untuk user
router
  .get('/voucher-pulsa', async ({ view }) => {
    // eslint-disable-next-line @unicorn/no-await-expression-member
    const VoucherPulsa = (await import('#models/voucher_pulsa')).default
    const vouchers = await VoucherPulsa.all()
    return view.render('pages/voucher_pulsa/list', { vouchers })
  })
  .as('voucher_pulsa.list')
