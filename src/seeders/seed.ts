import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import { sequelize, User, Workspace } from '../models/index.model.js';

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const [admin] = await User.findOrCreate({
      where: { email: 'admin@correo.com' },
      defaults: { name: 'Admin Principal', email: 'admin@correo.com', password: adminPassword, role: 'ADMIN' }
    });

    const [usuario] = await User.findOrCreate({
      where: { email: 'usuario@correo.com' },
      defaults: { name: 'Usuario Demo', email: 'usuario@correo.com', password: userPassword, role: 'USER' }
    });

    await Workspace.findOrCreate({
      where: { name: 'Sala Norte' },
      defaults: { name: 'Sala Norte', location: 'Piso 1', capacity: 4, isAvailable: true }
    });

    await Workspace.findOrCreate({
      where: { name: 'Sala Sur' },
      defaults: { name: 'Sala Sur', location: 'Piso 2', capacity: 8, isAvailable: true }
    });

    await Workspace.findOrCreate({
      where: { name: 'Sala Este' },
      defaults: { name: 'Sala Este', location: 'Piso 3', capacity: 2, isAvailable: true }
    });

    console.log('Seed ejecutado correctamente.');
    console.log(`ADMIN -> email: ${admin.email} / password: admin123`);
    console.log(`USER  -> email: ${usuario.email} / password: user123`);

    process.exit(0);
  } catch (error) {
    console.error('Error ejecutando el seed:', error);
    process.exit(1);
  }
}

seed();