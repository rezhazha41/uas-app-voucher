/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
*/

import router from '@adonisjs/core/services/router'
import User from '#models/user'
import { middleware } from './kernel.js'

// Auth Controller
const RegisterController = () => import('#controllers/auth/registers_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RiwayatController = () => import('#controllers/riwayats_controller')

// Admin Voucher Controller
const VouchersController = () => import('#controllers/admin/vouchers_controller')
const VoucherDiskonsController = () => import('#controllers/admin/voucher_diskons_controller')
const VoucherListrikController = () => import('#controllers/admin/voucher_listriks_controller')
const VoucherPulsasController = () => import('#controllers/voucher_pulsas_controller')

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
 */
router
  .get('/admin/login', async ({ view }) => {
    return view.render('pages/admin/login')
  })
  .as('admin.login.show')

router
  .post('/admin/login', async ({ request, response, auth, session }) => {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)

      if (user.role !== 'admin') {
        session.flash('errors', { E_INVALID_CREDENTIALS: 'Akun bukan admin.' })
        return response.redirect().toRoute('admin.login.show')
      }

      await auth.use('web').login(user)

      console.log('LOGIN BERHASIL:', user.email, user.role)

      return response.redirect().toRoute('admin.vouchers.dashboard')
    } catch (error) {
      session.flash('errors', { E_INVALID_CREDENTIALS: 'Login gagal!' })
      return response.redirect().toRoute('admin.login.show')
    }
  })
  .as('admin.login') // ⛔️ TANPA middleware

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
  .middleware([middleware.auth(), middleware.admin()])

// HALAMAN DASHBOARD ADMIN CRUD UNTUK VOUCHER PULSA
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
// Daftar voucher pulsa yang BELUM dibeli
router
  .get('/voucher-pulsa', async ({ view }) => {
    // eslint-disable-next-line @unicorn/no-await-expression-member
    const VoucherPulsa = (await import('#models/voucher_pulsa')).default
    const vouchers = await VoucherPulsa.query().where('is_sold', false)
    return view.render('pages/voucher_pulsa/list', { vouchers })
  })
  .as('voucher_pulsa.list')

// User membeli voucher pulsa
router
  .post('/voucher-pulsa/:id/beli', async ({ params, response, auth }) => {
    // eslint-disable-next-line @unicorn/no-await-expression-member
    const VoucherPulsa = (await import('#models/voucher_pulsa')).default
    const voucher = await VoucherPulsa.findOrFail(params.id)

    if (voucher.is_sold) {
      return response.badRequest('Voucher sudah dibeli.')
    }

    voucher.is_sold = true
    voucher.user_id = auth.user!.id // <- set user ID pembeli
    await voucher.save()

    return response.redirect().toRoute('voucher_pulsa.history') // redirect ke halaman riwayat pembelian
  })
  .as('voucher.beli')
  .middleware([middleware.auth()])

// Halaman riwayat voucher yang DIBELI oleh user login
router
  .get('/voucher-pulsa/riwayat', async ({ auth, view }) => {
    // eslint-disable-next-line @unicorn/no-await-expression-member
    const VoucherPulsa = (await import('#models/voucher_pulsa')).default
    const user = auth.user!

    const vouchers = await VoucherPulsa.query().where('is_sold', true).andWhere('user_id', user.id) // <- ini penting agar hanya menampilkan milik user ini

    return view.render('pages/voucher_pulsa/history', { vouchers })
  })
  .as('voucher_pulsa.history')
  .middleware([middleware.auth()])

// Admin Voucher Data
const VoucherDatasController = () => import('#controllers/admin/voucher_datas_controller')

router
  .group(() => {
    router.get('/', [VoucherDatasController, 'index']).as('index')
    router.get('/create', [VoucherDatasController, 'create']).as('create')
    router.post('/', [VoucherDatasController, 'store']).as('store')
    router.get('/:id/edit', [VoucherDatasController, 'edit']).as('edit')
    router.put('/:id', [VoucherDatasController, 'update']).as('update')
    router.delete('/:id', [VoucherDatasController, 'destroy']).as('destroy')
  })
  .prefix('/admin/voucher_data')
  .as('admin.voucher_data')
  .middleware([middleware.auth(), middleware.admin()])

// Voucher Diskon Belanja
router
  .group(() => {
    router.get('/', [VoucherDiskonsController, 'index']).as('index')
    router.get('/create', [VoucherDiskonsController, 'create']).as('create')
    router.post('/', [VoucherDiskonsController, 'store']).as('store')
    router.get('/:id/edit', [VoucherDiskonsController, 'edit']).as('edit')
    router.put('/:id', [VoucherDiskonsController, 'update']).as('update')
    router.delete('/:id', [VoucherDiskonsController, 'destroy']).as('destroy')
  })
  .prefix('/admin/voucher_diskon')
  .as('admin.voucher_diskon')
  .middleware([middleware.auth(), middleware.admin()])

// Voucher Token Listrik
// Admin Voucher Token Listrik
router
  .group(() => {
    router.get('/', [VoucherListrikController, 'index']).as('index')
    router.get('/create', [VoucherListrikController, 'create']).as('create')
    router.post('/', [VoucherListrikController, 'store']).as('store')
    router.get('/:id/edit', [VoucherListrikController, 'edit']).as('edit')
    router.put('/:id', [VoucherListrikController, 'update']).as('update')
    router.delete('/:id', [VoucherListrikController, 'destroy']).as('destroy')
  })
  .prefix('/admin/voucher_listrik')
  .as('admin.voucher_listrik')
  .middleware([middleware.auth(), middleware.admin()])

/////VOUCHER DATA
router
  .get('/voucher-data', async ({ view }) => {
    // eslint-disable-next-line @unicorn/no-await-expression-member
    const VoucherData = (await import('#models/voucher_data')).default
    const vouchers = await VoucherData.query().where('is_sold', false)
    return view.render('pages/voucher_data/list', { vouchers })
  })
  .as('voucher_data.list')

router
  .post('/voucher-data/:id/beli', async ({ params, response, auth }) => {
    // eslint-disable-next-line @unicorn/no-await-expression-member
    const VoucherData = (await import('#models/voucher_data')).default
    const voucher = await VoucherData.findOrFail(params.id)

    if (voucher.is_sold) {
      return response.badRequest('Voucher sudah dibeli.')
    }

    voucher.is_sold = true
    voucher.user_id = auth.user!.id
    await voucher.save()

    return response.redirect().toRoute('voucher_data.history')
  })
  .as('voucher_data.beli')
  .middleware([middleware.auth()])

router
  .get('/voucher-data/riwayat', async ({ auth, view }) => {
    // eslint-disable-next-line @unicorn/no-await-expression-member
    const VoucherData = (await import('#models/voucher_data')).default
    const user = auth.user!

    const vouchers = await VoucherData.query().where('is_sold', true).andWhere('user_id', user.id)

    return view.render('pages/voucher_data/history', { vouchers })
  })
  .as('voucher_data.history')
  .middleware([middleware.auth()])
///voucher diskon
router
  .get('/voucher-diskon', async ({ view }) => {
    // eslint-disable-next-line @unicorn/no-await-expression-member
    const VoucherDiskon = (await import('#models/voucher_diskon')).default
    const vouchers = await VoucherDiskon.query().where('is_sold', false)
    return view.render('pages/voucher_diskon/list', { vouchers })
  })
  .as('voucher_diskon.list')

router
  .post('/voucher-diskon/:id/beli', async ({ params, response, auth }) => {
    // eslint-disable-next-line @unicorn/no-await-expression-member
    const VoucherDiskon = (await import('#models/voucher_diskon')).default
    const voucher = await VoucherDiskon.findOrFail(params.id)

    if (voucher.is_sold) {
      return response.badRequest('Voucher sudah dibeli.')
    }

    voucher.is_sold = true
    voucher.user_id = auth.user!.id
    await voucher.save()

    return response.redirect().toRoute('voucher_diskon.history')
  })
  .as('voucher_diskon.beli')
  .middleware([middleware.auth()])

router
  .get('/voucher-diskon/riwayat', async ({ auth, view }) => {
    // eslint-disable-next-line @unicorn/no-await-expression-member
    const VoucherDiskon = (await import('#models/voucher_diskon')).default
    const user = auth.user!

    const vouchers = await VoucherDiskon.query().where('is_sold', true).andWhere('user_id', user.id)

    return view.render('pages/voucher_diskon/history', { vouchers })
  })
  .as('voucher_diskon.history')
  .middleware([middleware.auth()])
///voucher listrik
router
  .get('/voucher-listrik', async ({ view }) => {
    // eslint-disable-next-line @unicorn/no-await-expression-member
    const VoucherListrik = (await import('#models/voucher_listrik')).default
    const vouchers = await VoucherListrik.query().where('is_sold', false)
    return view.render('pages/voucher_listrik/list', { vouchers })
  })
  .as('voucher_listrik.list')

router
  .post('/voucher-listrik/:id/beli', async ({ params, response, auth }) => {
    // eslint-disable-next-line @unicorn/no-await-expression-member
    const VoucherListrik = (await import('#models/voucher_listrik')).default
    const voucher = await VoucherListrik.findOrFail(params.id)

    if (voucher.is_sold) {
      return response.badRequest('Voucher sudah dibeli.')
    }

    voucher.is_sold = true
    voucher.user_id = auth.user!.id
    await voucher.save()

    return response.redirect().toRoute('voucher_listrik.history')
  })
  .as('voucher_listrik.beli')
  .middleware([middleware.auth()])

router
  .get('/voucher-listrik/riwayat', async ({ auth, view }) => {
    // eslint-disable-next-line @unicorn/no-await-expression-member
    const VoucherListrik = (await import('#models/voucher_listrik')).default
    const user = auth.user!

    const vouchers = await VoucherListrik.query()
      .where('is_sold', true)
      .andWhere('user_id', user.id)

    return view.render('pages/voucher_listrik/history', { vouchers })
  })
  .as('voucher_listrik.history')
  .middleware([middleware.auth()])

router.get('/riwayat', [RiwayatController, 'index']).as('riwayat').middleware([middleware.auth()])
