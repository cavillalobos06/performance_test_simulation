import { sequelize } from './config/database.js';
import { env } from './config/env.js';
import { app } from './app.js';

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');

    await sequelize.sync();
    console.log('Database models synchronized');

    app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
      console.log(`Swagger available on http://localhost:${env.port}/api/docs`);
    });
  } catch (error) {
    console.error('Application startup failed', error);
    process.exit(1);
  }
}

start();
