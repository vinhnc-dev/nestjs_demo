const setOrmConfig = async () => {
  return [
    {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_USER_PASSWORD,
      database: process.env.DB_NAME,
      name: 'default',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: ['dist/database/migrations/*.js'],
      cli: { migrationsDir: 'src/database/migrations' },
    },
  ];
};

module.exports = setOrmConfig();
