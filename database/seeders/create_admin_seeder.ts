// database/seeders/user_seeder.ts

import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'Admin Voucherku',
      email: 'admin@voucherku.com',
      password: 'password123', // pastikan hash aktif
      role: 'admin',
    })
  }
}
