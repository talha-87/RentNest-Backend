export default {
  port: process.env.PORT || 5000,

  databaseUrl: process.env.DATABASE_URL,

  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET as string,
    accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string,
  },

  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS),

  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY as string,
  },
};