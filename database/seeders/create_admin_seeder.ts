import User from '#models/user'

export default class CreateAdminSeeder {
  public async run() {
    await User.create({
      fullName: 'Admin Voucher',
      email: 'admin@voucherku.com',
      password: 'password123', // Akan otomatis di-hash oleh model
    })

    console.log('✅ Admin created!')
  }
}
