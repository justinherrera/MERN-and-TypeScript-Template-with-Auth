import dotenv from 'dotenv'

const env = dotenv.config();
if (env.error) {
  throw new Error("Cannot find .env file");
}

export default {
  port: process.env.PORT || 3000,
  databaseURL: process.env.DATABASE_URI,
  paypal: {
    publicKey: process.env.PAYPAL_PUBLIC_KEY,
    secretKey: process.env.PAYPAL_SECRET_KEY,
  },
  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY,
    sender: process.env.MAILCHIMP_SENDER,
  },
  mailtrap: {
    userName: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT
  },
  jwt: {
    secretKey: process.env.JWT_SECRET,
    cookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN
  },
  prefix: {
      api: '/api'
  }
}
